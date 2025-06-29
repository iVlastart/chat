import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
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
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
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
  switch (pathname) {
    case '/':
      return <Friends/>;

    case '/orders':
      return <div>Here are your Orders</div>;

    case '/reports/sales':
      return (
        <iframe
          src="https://example.com/sales-report"
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="Sales Report"
        />
      );

    case '/reports/traffic':
      return (
        <iframe
          src="https://example.com/traffic-report"
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="Traffic Report"
        />
      );

    case '/integrations':
      return <div>Integrations content goes here.</div>;

    default:
      return <div>404 - Page not found</div>;
  }
}

export default function App(props:any) {
  const { window } = props;
  const nav = useNavigate();
  const router = useDemoRouter('/');

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