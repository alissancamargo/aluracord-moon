function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        // background: black;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      body {
        font-family: 'Open Sans', sans-serif;
      }

      ::-webkit-scrollbar {
        width: 5px; /* width of the entire scrollbar */
      }

      ::-webkit-scrollbar-track {
        background: #52667a;
        border-radius: 3px; /* color of the tracking area */
      }

      ::-webkit-scrollbar-thumb {
        background-color: #c9a3c4; /* color of the scroll thumb */
        border-radius: 3px; /* roundness of the scroll thumb */
        border: 2px solid; /* creates padding around scroll thumb */
      }

      /*App fit Height */
      html,
      body,
      #_next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }

      #_next {
        flex: 1;
      }

      #_next > * {
        flex: 1;
      }
      /* ./App fit Height*/
    `}</style>
  )
}

export default function MyApp({ Component, pageProps }) {
  console.log('Roda em todas as páginas')
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
