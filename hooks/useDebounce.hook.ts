import { useCallback, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => ReturnType<T> {
    const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    return useCallback(
        (...args: Parameters<T>): ReturnType<T> => {
            return new Promise<ReturnType<T>>((resolve, reject) => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    try {
                        const result = callback(...args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, delay);
            }) as ReturnType<T>;
        },
        [callback, delay]
    );
}
