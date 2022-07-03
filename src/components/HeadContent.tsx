import Head from 'next/head'
import { Fragment } from 'react'


const HeadContent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="CRUD challenge for Dev Front End" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="pt-br, en-US" />
        <meta name="keywords" content="crud, challange, patient, register" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="index,follow"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  )
}
export default HeadContent