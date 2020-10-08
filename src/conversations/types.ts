export interface IConversationMessage {
	_id: string;
	conversationId: string;
	createdAt: Date;
	emitter: string;
	targets: string[];
	content: string;
}

export interface IConversation {
	_id: string;
	main: boolean;
	targets: string[];
	updatedAt: Date;
	unseenMessages: number;
	messages: IConversationMessage[];
}

//Redux
export const UPDATE_CONVERSATIONS = "UPDATE_CONVERSATIONS";

export interface IUpdateConversationsAction {
	type: typeof UPDATE_CONVERSATIONS,
	conversationsList: IConversation[]
}

export interface IConversationsState {
	conversationsList: IConversation[]
}

export type IConversationsAction = IUpdateConversationsAction;
