import {MainScreen} from './pages/main-screen.tsx';

type AppProps = {
  countPages: number;
}

export function App(props: AppProps) {
  return <MainScreen countPages={props.countPages}/>;
}
