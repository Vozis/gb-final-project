import styles from './footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_none}>
        <h1>The work of the coolest team!</h1>
      </div>
    </footer>
  );
}

export default Footer;
