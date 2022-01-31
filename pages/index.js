import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import appConfig from './config.json'

export function Titulo(props) {
  // console.log(props)
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary[200]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Titulo tag="h2">Boas vindas de volta!</Titulo>
//       <h2>Discord - Alura Moon</h2>
//     </div>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  const [username, setUsername] = useState('alissancamargo')
  const [userbio, setUserbio] = useState('alissancamargo')
  const roteamento = useRouter()

  // const imageDefault =
  //   'https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png'

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => setUserbio(data.bio))
  }, [username])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          width: '100vw',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://cutewallpaper.org/22/sailor-moon-aesthetic-desktop-scenery-wallpapers/447115266.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '15px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[400],
            backgroundColor: appConfig.theme.colors.transparente.fundo
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault()

              if (username.length <= 2) {
                return alert('Digite o username correto!')
              }

              console.log('Alguém submeteu o form')
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            <Titulo tag="h2">Bem Vindos!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '25px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            >
              {appConfig.name}
            </Text>
            {/* <input type="text" /> */}
            <TextField
              value={username}
              onChange={function (event) {
                console.log('Alguém digitou algo', event.target.value)
                const valor = event.target.value
                setUsername(valor)
              }}
              // styleSheet={{ width: '100%', paddingRight: 0, marginRight: 0 }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[400],
                  mainColorHighlight: appConfig.theme.colors.primary[400],
                  // backgroundColor: appConfig.theme.colors.neutrals[500],
                  backgroundColor: appConfig.theme.colors.transparente.fundo
                }
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '250px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[500],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[400],
              borderRadius: '15px',
              flex: 1,
              minHeight: '240px',
              backgroundColor: appConfig.theme.colors.transparenteArea.fundoArea
            }}
          >
            {username.length > 2 && (
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}
                src={
                  `https://github.com/${username}.png`
                  // : imageDefault
                }
              />
            )}

            {username?.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['000'],
                  backgroundColor: appConfig.theme.colors.primary[500],
                  padding: '3px 10px',
                  borderRadius: '5px'
                }}
              >
                {username}
              </Text>
            )}

            {userbio?.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '10px',
                  borderRadius: '10px',
                  marginTop: '10px',
                  textAlign: 'center',
                  backgroundColor:
                    appConfig.theme.colors.transparenteArea.fundoArea
                }}
              >
                {userbio}
              </Text>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
