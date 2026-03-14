import {Main} from './pages/main-screen/Main.tsx';

type AppProps = {
  countPages: number;
}

export function App(props: AppProps): JSX.Element {
  return <Main countPages={props.countPages}/>;
}
