import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import debounce from "lodash.debounce";

type Div = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface InfiniteScrollProps extends Div {
  children: React.ReactNode;
  onScrollTop?: () => void;
  onScrollBottom?: () => void;
}

interface ObserverProps extends Div {
  callback?: () => void;
  direction: "top" | "bottom";
  rootMargin?: number;
  wait?: number;
}

const Observer = ({
  callback,
  className,
  direction,
  rootMargin = 0,
  wait = 12,
  ...props
}: ObserverProps) => {
  const isTop = direction === "top";
  const { ref, inView, entry } = useInView({
    threshold: 0,
    rootMargin: isTop
      ? `${rootMargin}px 0px 0px 0px`
      : `0px 0px ${rootMargin}px 0px`,
  });
  const debouncedCallback =
    typeof callback !== "undefined" &&
    debounce(() => {
      callback();

      entry?.target.parentElement?.scrollBy(
        0,
        (rootMargin + 5) * (isTop ? 1 : -1)
      );
    }, wait);

  useEffect(() => {
    if (inView) debouncedCallback && debouncedCallback();
  }, [inView]);

  return (
    <div ref={ref} {...props} className={"h-12 w-full " + className}></div>
  );
};

const InfiniteScroll = ({
  children,
  onScrollTop,
  onScrollBottom,
  ...props
}: InfiniteScrollProps) => {
  return (
    <div {...props}>
      <Observer callback={onScrollTop} direction="top" rootMargin={100} />
      {children}
      <Observer
        callback={onScrollBottom}
        direction="bottom"
        rootMargin={100}
        className=""
      />
    </div>
  );
};

export default InfiniteScroll;
