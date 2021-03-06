import Constants from "app/utils/Constants";

export default {
  auth: {
    authenticateUser: Constants.api.baseUrl + "/auth",
    updateUser: Constants.api.baseUrl + "/auth/user",
    logout: Constants.api.baseUrl + "/auth/logout",
    getUser: Constants.api.baseUrl + "/auth/user",
    registerUser: Constants.api.baseUrl + "/auth/register",
    mailConfirmUser: Constants.api.baseUrl + "/activate/:uidb64/:token",
    loginUser: Constants.api.baseUrl + "/auth/login",
    changePassword: Constants.api.baseUrl + "/auth/change_password",
    forgotPassword: Constants.api.baseUrl + "/auth/password_reset",
    resetPasswordLink: Constants.api.baseUrl + "/reset_password/:uidb64/:token/",
    uploadAvatar: Constants.api.baseUrl + "/auth/profile_pic/update",
  },
  admin: {
    operators: Constants.api.baseUrl + "/adminowner/adminoperator/list",
    operatorCreate: Constants.api.baseUrl + "/adminowner/adminoperator/create",
    operatorDetails: Constants.api.baseUrl + "/adminowner/adminoperator/update/:id",
    chatbotCount: Constants.api.baseUrl + "/adminowner/chatbot/count",
  },
  teams: {
    addTeam: Constants.api.baseUrl + "/adminowner/teams",
    getTeams: Constants.api.baseUrl + "/adminowner/teams",
    getTeamOperators: Constants.api.baseUrl + "/adminowner/adminoperator/team/:team_id/list",
  },
  bot: {
    bots: Constants.api.baseUrl + "/chatbox",
    botDetails: Constants.api.baseUrl + "/chatbox/:id",
    botSessionInMemory: Constants.api.baseUrl + "/clientwidget/session/preview/:id",
    botSession: Constants.api.baseUrl + "/clientwidget/session/:id",
    botDesign: Constants.api.baseUrl + "/chatbox/:id/chatboxappeareance",
    botFilteredActiveList: Constants.api.baseUrl + "/clientwidget/listing",
    botOperatorActiveList: Constants.api.baseUrl + "/clientwidget/assigned/listing",
    botActiveList: Constants.api.baseUrl + "/clientwidget/listing/sort/desc",
    botFilteredHistList: Constants.api.baseUrl + "/clientwidget/listing/inactive",
    botOperatorHistList: Constants.api.baseUrl + "/clientwidget/assigned/listing/inactive",
    botHistList: Constants.api.baseUrl + "/clientwidget/listing/inactive/sort/desc",
    publish: Constants.api.baseUrl + "/chatbox/:id/publish",

    deactivateBot: Constants.api.baseUrl + "/clientwidget/deactivate/:room_id",
    getHistory: Constants.api.baseUrl + "/clientwidget/:room_id/history",
    getSessionHistory: Constants.api.baseUrl + "/clientwidget/:room_id/sessionhistory",
    getVariables: Constants.api.baseUrl + "/clientwidget/:room_id/variables",
    getSessionVariables: Constants.api.baseUrl + "/clientwidget/:room_id/sessionvariables",
    getHistoryTail: Constants.api.baseUrl + "/clientwidget/:room_id/sessionhistory/:tail",
    whatsappChat: Constants.api.baseUrl + "/whatsappbot/agenttakeover/:room_id",

    sendMail: Constants.api.baseUrl + "/chatbox/send_mail",
    uploadImage: Constants.api.baseUrl + "/chatbox/upload/image/:id",
    duplicateBot: Constants.api.baseUrl + "/chatbox/duplicate",
    deleteBot: Constants.api.baseUrl + "/chatbox/delete/:id",
  },
  payments: {
    pingRazorpay: Constants.api.baseUrl + "/payment/initial",
    verifyPayment: Constants.api.baseUrl + "/payment/verify",
  },
  whatsapp: {
    channelCreateAndList: Constants.api.baseUrl + "/whatsappbot/testchannel",
    accountCreateAndList: Constants.api.baseUrl + "/whatsappbot/makeclient",
    botList: Constants.api.baseUrl + "/chatbox",
    channelDetails: Constants.api.baseUrl + "/whatsappbot/testchannel/:pk",
    accountDetails: Constants.api.baseUrl + "/whatsappbot/makeclient/:pk",
    accountEdit: Constants.api.baseUrl + "/whatsappbot/makeclient/:id",
    getPostTemplates: Constants.api.baseUrl + "/whatsappbot/maketemplate",
  },
  templates: {
    getTemplates: Constants.api.baseUrl + "/chatbox/template/frontend",
    createBot: Constants.api.baseUrl + "/chatbox/template/frontend",
  },
  chatdata: {
    listing: Constants.api.baseUrl + "/chatdata/listing",
    bot: Constants.api.baseUrl + "/chatdata/bot/:botId/filter/is_lead/true",
    headers: Constants.api.baseUrl + "/chatdata/headers/:botId",
    visitors: Constants.api.baseUrl + "/chatdata/bot/:botId/count/visitors",
    leads: Constants.api.baseUrl + "/chatdata/bot/:botId/count/leads",
    dateFilter: Constants.api.baseUrl + "/chatdata/bot/:botId/filter/date/:start_date/:end_date",
    exportData: Constants.api.baseUrl + "/chatdata/export/bot/:botId/csv",
    sendEmail: Constants.api.baseUrl + "/chatdata/email/bot/:botId/csv",
    googleSheets: Constants.api.baseUrl + "/chatdata/gsheets/:botId",
    setEmail: Constants.api.baseUrl + "/auth/user",
  },
  chat_manage: {
    assignOperator: Constants.api.baseUrl + "/clientwidget/room_assign",
    sendChatReview: Constants.api.baseUrl + "/clientwidget/room/chat_review",
    getChatReview: Constants.api.baseUrl + "/clientwidget/room/chat_review/:room_id",
  },
  metrics: {
    getTeamMetrics: Constants.api.baseUrl + "/adminowner/metric/team",
    getOperatorMetrics: Constants.api.baseUrl + "/adminowner/metric/operator",
  },
};
