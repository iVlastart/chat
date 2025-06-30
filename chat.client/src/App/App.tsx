import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MessageIcon from "@mui/icons-material/Message"
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Friends from '../pages/Friends';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: '',
    title: 'Friends',
    icon: <EmojiPeopleIcon/>,
  },
  {
    segment: 'chat',
    title: 'Chat',
    icon: <MessageIcon />,
  },
  {
    segment: 'logout',
    title: 'Log out',
  }
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath:any) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path:any) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function PageContent({ pathname }: { pathname: string }) {
  const nav = useNavigate();
  switch (pathname) {
    case '/':
      return <Friends/>;

    case '/chat':
      return <div>Here is going to be the chat</div>;

    case '/logout':
      sessionStorage.clear();
      nav('/login');
      break;
    default:
      return <div>404 - Page not found</div>;
  }
}

export default function App(props:any) {
  const { window } = props;
  const router = useDemoRouter('/');
  const nav = useNavigate();
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  useEffect(()=>{
    if(!sessionStorage.getItem('username')) nav('/login');
  });

  return (
    <AppProvider
      navigation={NAVIGATION as any}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <title>Chat App</title>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <PageContent pathname={router.pathname} />
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}