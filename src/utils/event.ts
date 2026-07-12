// oxlint-disable-next-line typescript/no-explicit-any
type EventCallback<T = any> = (payload: T) => void | Promise<void>;
type Unsubscribe = () => void;

class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map();

  private static instance: EventBus;

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  public on<T>(event: string, callback: EventCallback<T>): Unsubscribe {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    const callbacks = this.events.get(event)!;
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);

      if (callbacks.size === 0) {
        this.events.delete(event);
      }
    };
  }

  public once<T>(event: string, callback: EventCallback<T>): () => void {
    const wrapper: EventCallback<T> = (payload) => {
      callback(payload);
      off();
    };
    const off = this.on(event, wrapper);

    return off;
  }

  public emit<T>(event: string, payload?: T): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;

    // 为了安全，避免在迭代时因回调内部修改集合导致问题，复制一份执行
    const cbs = [...callbacks];
    for (const cb of cbs) {
      const result = cb(payload);

      if (result instanceof Promise)
        result.catch((err) => console.error(`Error in event "${event}":`, err));
    }
  }

  public clear(event: string): void {
    this.events.delete(event);
  }

  public clearAll(): void {
    this.events.clear();
  }
}

const eventBus = EventBus.getInstance();

export const send = <T>(eventName: string, payload?: T) => {
  eventBus.emit(eventName, payload);
};

export const receive = <T>(
  eventName: string,
  callback: EventCallback<T>,
  once?: boolean,
): Unsubscribe => {
  if (once) return eventBus.once(eventName, callback);
  else return eventBus.on(eventName, callback);
};
