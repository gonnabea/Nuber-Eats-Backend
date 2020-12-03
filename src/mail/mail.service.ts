import got from "got"
import * as FormData from "form-data"
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';


@Injectable()
export class MailService {
    constructor (
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    ) {
        this.sendEmail("testing", "테스트 이메일입니다!")
    } 

    private async sendEmail(subject: string, template: string){
        const form = new FormData()
        form.append("from", `Excited User <mailgun@${this.options.domain}>`)
        form.append("to", 'awesomedev3@gmail.com')
        form.append("subject", subject)
        form.append("template", template)
        form.append("v:code", "whatever")
        form.append("v:username", "Jiwon!!")
        const response = await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
            headers: {
                "Authorization": `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString("base64")}`
            },
            method: "POST",
            body: form
        })
        console.log(response.body)
    }
}
