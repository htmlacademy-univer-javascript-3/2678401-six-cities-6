import {MainScreen} from './pages/main-screen/main-screen.tsx';

type AppProps = {
  countPages: number;
}

export function App(props: AppProps): JSX.Element {
  return <MainScreen countPages={props.countPages}/>;
}
