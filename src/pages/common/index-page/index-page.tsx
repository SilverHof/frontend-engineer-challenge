import { reatomForm } from '@reatom/core'
import { reatomComponent, bindField } from '@reatom/react'

const form = reatomForm({
  name: '',
})

export const IndexPage = reatomComponent(() => {
  return <input type='text' {...bindField(form.fields.name)} />
}, 'IndexPage')
