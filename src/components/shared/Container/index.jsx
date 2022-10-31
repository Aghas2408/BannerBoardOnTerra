import "./styles.scss";

export default function Container({ children, className = "", otherProps }) {
  return (
    <section className={`container ${className}`} {...otherProps}>
      {children}
    </section>
  );
}
