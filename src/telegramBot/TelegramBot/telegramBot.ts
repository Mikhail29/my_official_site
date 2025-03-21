const TelegramBot = require('node-telegram-bot-api')

interface Message {
	message_id: bigint
	business_connection_id?: string
	from: {
		id: bigint
		is_bot: boolean
		first_name: string
		last_name: string
		username: string
		language_code: string
	}
	chat: {
		id: bigint
		first_name: string
		last_name: string
		username: string
		type: string
	}
	date: bigint
	text: string
}

class TelegramBotController {
	private token: string
	private bot: any
	private lastMessage: Message | false
	private assistant: any | false
	constructor(token: string) {
		this.answerForMessage = this.answerForMessage.bind(this)
		this.getLastMessage = this.getLastMessage.bind(this)
		this.answerForBusinesssMessage = this.answerForBusinesssMessage.bind(this)
		this.lastMessage = false
		this.assistant = false
		this.token = token
		this.bot = new TelegramBot(this.token, { polling: true })
		this.bot.on('text', this.answerForMessage)
		this.bot.on('business_message', this.answerForBusinesssMessage)
		this.bot.on('polling_error', (error: { code: any; message: any; stack: any }) => {
			// console.log(error)
			console.log('Polling error code: ', error.code)
			console.log('Error Message: ', error.message)
			console.log('Stack trace: ', error.stack)
		})
	}

	setOpenAiAssistant(assistant: any) {
		this.assistant = assistant
	}

	private answerForMessage(msg: Message) {
		this.lastMessage = msg
		const chatId = msg.chat.id

		if (this.assistant !== false) {
			this.assistant.message(msg.text).then((response: any) => {
				console.log(response)
				this.bot.sendMessage(chatId, response.data.message)
			})
		}

		this.bot.sendMessage(chatId, 'Received your message')
	}

	private answerForBusinesssMessage(msg: Message) {
		if (this.assistant !== false) {
			this.assistant.message(msg.text).then((response: any) => {
				console.log(response)
				this.bot.sendMessage(msg.chat.id, response.data.message, {
					business_connection_id: msg.business_connection_id,
				})
			})
		}
		this.bot.sendMessage(msg.chat.id, 'Received your message', {
			business_connection_id: msg.business_connection_id,
		})
	}

	getLastMessage() {
		return this.lastMessage
	}
}

export default TelegramBotController
