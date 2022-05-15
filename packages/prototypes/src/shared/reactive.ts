
import { computed as vueComputed, ComputedGetter, ComputedRef, watch as vueWatch, watchEffect as VueWatchEffect, shallowRef, onBeforeUnmount } from 'vue-demi';
import { autorun, reaction } from '@formily/reactive';
export * from 'vue-demi';

export const computed = <T>(calc: ComputedGetter<T>): ComputedRef<T> => {
    const temp = shallowRef<T>();
    let dispose: () => void;
    onBeforeUnmount(() => dispose?.());
    return vueComputed<T>((ctx?: any) => {
        dispose?.();
        dispose = autorun(() => temp.value = calc(ctx));
        return temp.value as T;
    });
};

type Watch = typeof vueWatch
export const watch = (deps: Parameters<Watch>[0], callback: Parameters<Watch>[1], options?: Parameters<Watch>[2]): ReturnType<Watch> => {
    if (Array.isArray(deps)) {
        const disposes = deps.map((dep, i) => {
            if (typeof dep === 'function') {
                const newVs: unknown[] = [];
                const oldVs: unknown[] = [];
                return reaction(dep, (n, o) => {
                    newVs[i] = n;
                    oldVs[i] = o;
                    callback(newVs, oldVs, onBeforeUnmount);
                });
            }
        }).filter(item => item !== undefined);
        onBeforeUnmount(() => disposes.forEach(dispose => dispose?.()));
    } else if (typeof deps === 'function') {
        const dispose = reaction(deps as () => unknown, (n, o) => callback(n as any, o as any, onBeforeUnmount));
        onBeforeUnmount(() => dispose?.());
    }
    return vueWatch(deps, callback, options);
};

type WatchEffect = typeof VueWatchEffect
export const watchEffect: WatchEffect = (effect: Parameters<WatchEffect>[0], options: Parameters<WatchEffect>[1]): ReturnType<WatchEffect> => {
    let dispose: () => void;
    return VueWatchEffect((onInvalidate) => {
        dispose = autorun(() => effect(onInvalidate));
        onInvalidate(dispose);
    }, options);
};