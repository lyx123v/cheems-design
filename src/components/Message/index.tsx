import { MessageProvider as Message } from "./Message";
import type { Position, MessageProps, MessageRef } from "./Message";
import { ConfigProvider } from "./ConfigProvider";
import { useMessage } from "./useMessage";

export type { MessageProps, MessageRef, Position };
export default { Message, ConfigProvider, useMessage };
