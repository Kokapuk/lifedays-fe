import { throttle } from 'lodash';
import { ReactElement, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './ShowMore.module.scss';

export interface ShowMoreProps<T> {
  items: T[];
  renderItem(item: T): ReactElement;
  renderMoreTrigger(count: number): ReactElement;
  gap: string | number;
  direction: 'row' | 'column' | 'column-reverse' | 'row-reverse';
}

const ShowMore = <T,>({ items, renderItem, renderMoreTrigger, direction, gap }: ShowMoreProps<T>) => {
  const container = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(0);

  const recalculate = useCallback(() => {
    if (!container.current) {
      return;
    }

    const isOverflowing = () => {
      return container.current!.scrollHeight - container.current!.clientHeight > 0;
    };

    const hideOverflowingChildren = (children: HTMLElement[]) => {
      const hiddenChildren: { element: HTMLElement; restore: () => void }[] = [];

      for (const child of children) {
        const savedDisplay = {
          value: child.style.getPropertyValue('display'),
          priority: child.style.getPropertyPriority('display'),
        };
        child.style.setProperty('display', 'none', 'important');

        hiddenChildren.push({
          element: child,
          restore: () => child.style.setProperty('display', savedDisplay.value, savedDisplay.priority),
        });

        if (!isOverflowing()) {
          break;
        }
      }

      return hiddenChildren;
    };

    flushSync(() => setShowMore(0));

    if (!isOverflowing()) {
      return;
    }

    let children = Array.from(container.current.children) as HTMLElement[];
    children.reverse();

    const hiddenChildren = hideOverflowingChildren(children);
    flushSync(() => setShowMore(hiddenChildren.length));

    if (!isOverflowing()) {
      return;
    }

    children = children.filter((i) => !hiddenChildren.some((j) => j.element === i));
    hiddenChildren.push(...hideOverflowingChildren(children));

    hiddenChildren.forEach((i) => i.restore());
    flushSync(() => setShowMore(hiddenChildren.length));
  }, []);

  useLayoutEffect(() => {
    const throttledRecalculate = throttle(recalculate, 100);

    const observer = new ResizeObserver(() => throttledRecalculate());
    observer.observe(container.current!);

    return () => observer.disconnect();
  }, [gap, items, recalculate]);

  return (
    <div ref={container} className={styles.container} style={{ flexDirection: direction, gap }}>
      {items.slice(0, items.length - showMore).map(renderItem)}
      {!!showMore && renderMoreTrigger(showMore)}
    </div>
  );
};

export default ShowMore;
