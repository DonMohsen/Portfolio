  
  export const getStaticProps = () => {
    return {
      props: {
        buildTimestamp: Date.now()
      }
    }
  }
  