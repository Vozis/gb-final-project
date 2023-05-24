import styles from './footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <h1>The work of the coolest team!</h1>
    </footer>
  );
}

export default Footer;
