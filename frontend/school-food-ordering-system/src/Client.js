import * as contentful from 'contentful'

//module handles the fetching of data from the Contentful headless CMS
export const client  = contentful.createClient({
    space: 'ox8fxrfb2nbi',
    accessToken: '741Wq_vQV9-q2gEa4drDbfssfxnlDPdtL8XGnTlS1ho'
})
