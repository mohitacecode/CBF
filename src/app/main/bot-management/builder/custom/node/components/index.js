import { InitTrayConfig } from "./Init";
import { EndTrayConfig } from "./End";
import { MessageTrayConfig } from "./Message";
import { NameTrayConfig } from "./Name";
import { EmailTrayConfig } from "./Email";
import { PhoneTrayConfig } from "./Phone";
import { DateTrayConfig } from "./Date";
import { YesNoTrayConfig } from "./YesNo";
import { MultipleChoiceTrayConfig } from "./MultipleChoice";
import { AgentTransferTrayConfig } from "./AgentTransfer";
import { LinkTrayConfig } from "./Link";
import { SendEmailTrayConfig } from "./SendEmail";
import { MediaTrayConfig } from "./MediaNode";
import { CheckBoxTrayConfig } from "./MultipleCheckBox";
import { RatingTrayConfig } from "./Rating";
import { AddressTrayConfig } from "./Address";
import { CarouselTrayConfig } from "./ImageCarousel";

export { InitTrayConfig };

export const TrayItems = [
  InitTrayConfig,
  MessageTrayConfig,
  NameTrayConfig,
  EmailTrayConfig,
  AddressTrayConfig,
  SendEmailTrayConfig,
  CheckBoxTrayConfig,
  PhoneTrayConfig,
  LinkTrayConfig,
  AgentTransferTrayConfig,
  DateTrayConfig,
  YesNoTrayConfig,
  MediaTrayConfig,
  CarouselTrayConfig,
  MultipleChoiceTrayConfig,
  RatingTrayConfig,
  EndTrayConfig,
];
