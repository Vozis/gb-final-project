import styles from './footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className={'bg-yellow-600 py-5 flex justify-center items-center'}>
      <h1>Welcome to Footer!</h1>
    </footer>
  );
}

export default Footer;
