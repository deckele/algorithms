export class Queue<T> {
    private enqueueStack: T[];
    private dequeueStack: T[];
    constructor(from?: T[]) {
        this.enqueueStack = from || [];
        this.dequeueStack = [];
    }
    private hydrateQueue(): void {
        while (this.enqueueStack.length) {
            this.dequeueStack.push(this.enqueueStack.pop());
        }
    }
    public get length(): number {
        return this.enqueueStack.length + this.dequeueStack.length;
    }
    public isEmpty(): boolean {
        return this.length === 0;
    }
    public peek(): T {
        if (this.dequeueStack.length) {
            return this.dequeueStack[this.dequeueStack.length - 1];
        } else {
            return this.enqueueStack[0];
        }
    }
    public enqueue(value: T): void {
        this.enqueueStack.push(value);
    }
    public dequeue(): T {
        if (!this.dequeueStack.length) {
            this.hydrateQueue();
        }
        return this.dequeueStack.pop();
    }
    public toString(): string {
        this.hydrateQueue();
        return this.dequeueStack.toString();
    }
}