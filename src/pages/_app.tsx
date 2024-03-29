import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../hooks/useAuth'
import { GlobalProvider } from '../hooks/useGlobal'
import { SettingProvider } from '../hooks/useSetting'
import { WorkspaceProvider } from '../hooks/useWorkspace'
import { UserProvider } from '../hooks/useUser'
import { SpecialistProvider } from '../hooks/useSpecialist'
import { FormProvider } from '../hooks/useForm'
import { SkillProvider } from '../hooks/useSkill'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#f9fafb" />

        <meta name="language" content="en" />
        <meta
          name="description"
          content="Aplicação para gestão de plano de ensino"
        />
        <meta name="robots" content="index" />
        <meta name="author" content="Unibalsas" />

        <meta property="og:type" content="page" />
        <meta property="og:url" content="https://postalcode.com" />
        <meta property="og:title" content="Pei Digital | By Unibalsas" />
        <meta property="og:image" content="https://i.imgur.com/6C4AvOM.png" />
        <meta
          property="og:description"
          content="Aplicação para gestão de plano de ensino"
        />

        <meta property="article:author" content="Unibalsas" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@unibalsas" />
        <meta name="twitter:title" content="Pei Digital | By Unibalsas" />
        <meta name="twitter:creator" content="@unibalsas" />
        <meta
          name="twitter:description"
          content="Aplicação para gestão de plano de ensino"
        />

        <link rel="canonical" href="https://postalcode.com" />
      </Head>
      <AuthProvider>
        <GlobalProvider>
          <SettingProvider>
            <WorkspaceProvider>
              <UserProvider>
                <SpecialistProvider>
                  <FormProvider>
                    <SkillProvider>
                      <Component {...pageProps} />
                    </SkillProvider>
                  </FormProvider>
                </SpecialistProvider>
              </UserProvider>
            </WorkspaceProvider>
          </SettingProvider>
        </GlobalProvider>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
