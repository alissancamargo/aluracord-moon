import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React, { useState, useEffect } from 'react'
import appConfig from './config.json'
import { createClient } from '@supabase/supabase-js'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from './src/ButtonSendSticker'
import dayjs from 'dayjs'
import { ButtonDelete } from './src/ButtonDelete'

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzYzNjk5NiwiZXhwIjoxOTU5MjEyOTk2fQ.MwC-N4B3C6_fzQHPjXxnNmR9mcoN2g7MY_IjX-ZeOHo'
const SUPABASE_URL = 'https://ubboepldsctyphkmazyy.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', respostaLive => {
      adicionaMensagem(respostaLive.new)
    })
    .subscribe()
}

async function handleDelete(id, setList) {
  await supabaseClient.from('mensagens').delete().match({ id })

  supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', { ascending: false })
    .then(({ data }) => setList(data))
}

export default function ChatPage() {
  const roteamento = useRouter()
  const usuarioLogado = roteamento.query.username
  const [mensagem, setMensagem] = useState('')
  const [load, setLoad] = useState(false)
  const [listaDeMensagem, setListaDeMensagem] = useState([])

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        console.log('Dados da consulta', data)
        setListaDeMensagem(data)

        escutaMensagensEmTempoReal(NovaMensagem => {
          console.log('NovaMensagem', NovaMensagem)
          // handleNovaMensagem(NovaMensagem)
          setListaDeMensagem(valorAtualdaLista => {
            return [NovaMensagem, ...valorAtualdaLista]
          })
          setLoad(false)
        })
      })
  }, [])

  function handleNovaMensagem(NovaMensagem) {
    setLoad(true)
    const mensagem = {
      id: Number(new Date()),
      de: usuarioLogado,
      texto: NovaMensagem
    }
    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        // console.log('Criando mensagem:', data)
      })

    setMensagem('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleNovaMensagem(mensagem)
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        width: '100vw',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://cutewallpaper.org/22/sailor-moon-aesthetic-desktop-scenery-wallpapers/447115266.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '15px',
          backgroundColor: appConfig.theme.colors.neutrals[400],
          backgroundColor: appConfig.theme.colors.transparenteArea.fundoArea,
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            maxWidth: '100%',
            // backgroundColor: appConfig.theme.colors.neutrals[500],
            backgroundColor: appConfig.theme.colors.transparenteArea.fundoArea,
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <MessageList
            mensagens={listaDeMensagem}
            setListaDeMensagem={setListaDeMensagem}
          />
          {/* {listaDeMensagem.map(mensagemAtual => {
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
              </li>
            )
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              value={mensagem}
              onChange={event => {
                const valor = event.target.value
                setMensagem(valor)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNovaMensagem(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                position: 'relative',
                // backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.transparente.fundo
              }}
            />
            <ButtonSendSticker
              onStickerClick={sticker => {
                console.log('usando esse componente', sticker)
                handleNovaMensagem(':sticker:' + sticker)
              }}
            />

            {load ? (
              <ReactLoading
                type="bubbles"
                color={appConfig.theme.colors.primary[400]}
                height={50}
                width={50}
              />
            ) : (
              <Button
                type="button"
                label="Enviar"
                onClick={handleSubmit}
                styleSheet={{
                  marginBottom: '10px'
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600]
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text
          variant="heading5"
          styleSheet={{ color: appConfig.theme.colors.primary[600] }}
        >
          Chat
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  console.log(props)
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['200'],
        marginBottom: '16px'
      }}
    >
      {props.mensagens.map(mensagem => {
        return (
          <>
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                position: 'relative',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700]
                }
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                  alignSelf: 'flex-end'
                }}
              >
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px'
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">{mensagem.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300]
                  }}
                  tag="span"
                >
                  {dayjs(mensagem.created_at).format('DD/MM/YYYY')}
                </Text>
              </Box>
              {mensagem.texto.startsWith(':sticker:') ? (
                <Image
                  src={mensagem.texto.replace(':sticker:', '')}
                  styleSheet={{
                    width: '150px'
                  }}
                />
              ) : (
                mensagem.texto
              )}
              <ButtonDelete
                onClick={() =>
                  handleDelete(mensagem.id, props.setListaDeMensagem)
                }
              />
            </Text>
          </>
        )
      })}
    </Box>
  )
}
