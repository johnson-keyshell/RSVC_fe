const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const API_ENDPOINTS = {
  nonPrivLandingPage: "/api/non-priv/buyer/landing-page",
  isUserLoggedIn: "/api/auth/is-user-logged-in",
  loggedInUserData: "/api/user/profile",
  propertyInfo:
    "/api/non-priv/buyer/property/2e8f4123-6ef3-4227-bc3f-5fa42efa56c5",
  logOut: "/api/auth/logout",
  localLogin: "/api/auth/local",
  selection: "/api/buyer/sail-selections/2e8f4123-6ef3-4227-bc3f-5fa42efa56c5",
  notification: "/api/notification",
  markAsRead: "/api/notification/set-read-flag/",
  uploadImage: "/api/image/upload",
  addEditListing: "/api/property/add-edit-listing",
  listingInfoUrl: "/api/owner/listing-info",
  addGeneralDetails: "/api/property/edit-general-details",
  addAdditionalDetails: "/api/property/edit-additional-details",
  notifyAgents: '/api/buyer/notify-selection/2e8f4123-6ef3-4227-bc3f-5fa42efa56c5',
  buyerProperty: '/api/buyer/property/2e8f4123-6ef3-4227-bc3f-5fa42efa56c5',
  buyerChatList: '/api/buyer/chat/list',
  signUp:'/api/signup',
  signUpImageUpload:'/api/signup/upload-pic',
  buyerChatMessage: (chatId) => `/api/buyer/chat/messages/${chatId}`,
  sendMessage: "/api/buyer/chat/send-message",
  setReadFlag: (chatId) => `/api/buyer/chat/set-read-flag/${chatId}`,
  uploadDocument: '/api/document/chat/upload',
  uploadChatImage: '/api/image/chat/upload',

  getSellerLandingPage: "/api/owner/landing-page",
  getPropertyDetails: "/api/property",
  getAdditionalDetails: '/api/owner/additional-details',
  ownerGeneralDetails: (propertyId) => `/api/owner/general-details/${propertyId}`,
  sellerChatList: '/api/owner/chat/chat-list',
  sellerAgentList: '/api/owner/agent-list',
  sellerUserList: '/api/owner/user-list',
  agentAssign: '/api/owner/add-agents',
  initiateChat: '/api/owner/chat/initiate-chat',
  sellerChatMessage: (chatId) => `/api/owner/chat/messages/${chatId}`,
  setSellerReadFlag: (chatId) => `/api/owner/chat/set-read-flag/${chatId}`,
  sendMessageSeller: "/api/owner/chat/send-message",
  convertExcel:"/api/property/convert-excel",
  saveProfile:"/api/user/save-profile",
  unreadChatCount:"/api/user/unread-chat-count",
  setSailStatus:"/api/owner/set-sail-status",
  excelTemplate:"/api/property/excel-template",





  agentChatList: '/api/agent/chat/buyer-list',
  agentChatMessage: (chatId) => `/api/agent/chat/messages/${chatId}`,
  sendMessageAgent: "/api/agent/chat/send-message",
  setReadFlagAgent: (chatId) => `/api/agent/chat/set-read-flag/${chatId}`,
  agentOwnerChatList: '/api/agent/chat/seller-list',

  agentAgreementGenerate: '/api/agent-agreement/generate',
  agentAgreementDetails: (agreementId) => `/api/agent-agreement/get-details/${agreementId}`,
  agentAgreementAccept: `/api/agent-agreement/accept-agreement`,
  agentAgreementReject: `/api/agent-agreement/reject-agreement`,
  agentAgreementSendOrNot: (sailId) => `/api/agent-agreement/get-agreement/${sailId}`,

  documentList: (sailId) => `/api/document/sail/get-list/${sailId}`,
  uploadSailDocument: `/api/document/sail/upload`,
  downloadSailDocument: (SailDocumentID) => `/api/document/sail/${SailDocumentID}`,
  sailDocumentDetails: (SailDocumentID) => `/api/document/sail/get-details/${SailDocumentID}`,
  approveSailDocument: (SailDocumentID) => `/api/document/sail/approve/${SailDocumentID}`,
  rejectSailDocument: (SailDocumentID) => `/api/document/sail/reject/${SailDocumentID}`,
  deleteSailDocument: (SailDocumentID) => `/api/document/sail/delete/${SailDocumentID}`,

  contractSailRecord: (sailId) => `/api/buyer/sail-record/${sailId}`,
  selectContractType: '/api/buyer/contract/set-type',
  generateContract: (sailId) => `/api/agent/contract/generate/${sailId}`,
  buyerSignUrl: (sailId) => `/api/buyer/contract/signing-url/${sailId}`,
  agentSignUrl: (sailId) => `/api/agent/contract/signing-url/${sailId}`,
  ownerSignUrl: (sailId) => `/api/owner/contract/signing-url/${sailId}`,
  contractSignStatus: (sailId) => `/api/buyer/contract/signing-status/${sailId}`,
  generateContractSeller: (sailId) => `/api/owner/contract/generate/${sailId}`,

  rejectContract: '/api/owner/reject-contract',
  approveContract: (SailID) => `/api/owner/approve-contract/${SailID}`,
  deleteContractAgent: (SailDocumentID) => `/api/agent/contract/delete/${SailDocumentID}`,
  deleteContractOwner: (SailDocumentID) => `/api/owner/contract/delete/${SailDocumentID}`,


};

export const API_ROUTES = {
  getIsUserLoggedIn: `${API_BASE_URL}${API_ENDPOINTS.isUserLoggedIn}`,
  getLoggedInUserData: `${API_BASE_URL}${API_ENDPOINTS.loggedInUserData}`,
  getLogOut: `${API_BASE_URL}${API_ENDPOINTS.logOut}`,
  postLocalLogin: `${API_BASE_URL}${API_ENDPOINTS.localLogin}`,
  postSignUp: `${API_BASE_URL}${API_ENDPOINTS.signUp}`,
  postImageUploadSignup: `${API_BASE_URL}${API_ENDPOINTS.signUpImageUpload}`,


  getPropertyInfo: `${API_BASE_URL}${API_ENDPOINTS.propertyInfo}`,
  getNonPrivLandingPage: `${API_BASE_URL}${API_ENDPOINTS.nonPrivLandingPage}`,
  getSelection: `${API_BASE_URL}${API_ENDPOINTS.selection}`,
  getNotification: `${API_BASE_URL}${API_ENDPOINTS.notification}`,
  markAsRead: `${API_BASE_URL}${API_ENDPOINTS.markAsRead}`,
  uploadPropertyImage: `${API_BASE_URL}${API_ENDPOINTS.uploadImage}`,
  addPropertyDetails: `${API_BASE_URL}${API_ENDPOINTS.addEditListing}`,
  getListingInfo: `${API_BASE_URL}${API_ENDPOINTS.listingInfoUrl}`,
  addGeneralDetails: `${API_BASE_URL}${API_ENDPOINTS.addGeneralDetails}`,
  addAdditionalDetails: `${API_BASE_URL}${API_ENDPOINTS.addAdditionalDetails}`,
  getSelection: `${API_BASE_URL}${API_ENDPOINTS.selection}`,
  postNotifyAgents: `${API_BASE_URL}${API_ENDPOINTS.notifyAgents}`,
  getBuyerProperty: `${API_BASE_URL}${API_ENDPOINTS.buyerProperty}`,

  //notification
  getNotification: `${API_BASE_URL}${API_ENDPOINTS.notification}`,
  markAsRead: `${API_BASE_URL}${API_ENDPOINTS.markAsRead}`,

  //buyer chat
  getBuyerChatList: `${API_BASE_URL}${API_ENDPOINTS.buyerChatList}`,
  getBuyerChatMessage: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.buyerChatMessage(chatId)}`,
  postSendMessage: `${API_BASE_URL}${API_ENDPOINTS.sendMessage}`,
  setReadFlag: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.setReadFlag(chatId)}`,

  //upload
  postUploadImage: `${API_BASE_URL}${API_ENDPOINTS.uploadImage}`,
  postUploadDocument: `${API_BASE_URL}${API_ENDPOINTS.uploadDocument}`,
  postUploadChatImage: `${API_BASE_URL}${API_ENDPOINTS.uploadChatImage}`,


  //agent chat
  getAgentChatList: `${API_BASE_URL}${API_ENDPOINTS.agentChatList}`,
  getAgentChatMessage: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.agentChatMessage(chatId)}`,
  postSendMessageAgent: `${API_BASE_URL}${API_ENDPOINTS.sendMessageAgent}`,
  setReadFlagAgent: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.setReadFlagAgent(chatId)}`,
  getAgentOwnerChatList: `${API_BASE_URL}${API_ENDPOINTS.agentOwnerChatList}`,

  postAgentAgreementGenerate: `${API_BASE_URL}${API_ENDPOINTS.agentAgreementGenerate}`,
  getAgentAgreementDetails: (agreementId) => `${API_BASE_URL}${API_ENDPOINTS.agentAgreementDetails(agreementId)}`,
  postAgentAgreementAccept: `${API_BASE_URL}${API_ENDPOINTS.agentAgreementAccept}`,
  postAgentAgreementReject: `${API_BASE_URL}${API_ENDPOINTS.agentAgreementReject}`,
  getAgentAgreementSendOrNot: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.agentAgreementSendOrNot(sailId)}`,
  postSaveProfile: `${API_BASE_URL}${API_ENDPOINTS.saveProfile}`,
  getUnreadChatCount: `${API_BASE_URL}${API_ENDPOINTS.unreadChatCount}`,

  //documents
  getDocumentList: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.documentList(sailId)}`,
  postUploadSailDocument: `${API_BASE_URL}${API_ENDPOINTS.uploadSailDocument}`,
  getDownloadSailDocument: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.downloadSailDocument(SailDocumentID)}`,
  getSailDocumentDetails: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.sailDocumentDetails(SailDocumentID)}`,
  postApproveSailDocument: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.approveSailDocument(SailDocumentID)}`,
  postRejectSailDocument: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.rejectSailDocument(SailDocumentID)}`,
  deleteSailDocument: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.deleteSailDocument(SailDocumentID)}`,

  //Seller
  getSellerLandingPage: `${API_BASE_URL}${API_ENDPOINTS.getSellerLandingPage}`,
  getPropertyDetails: `${API_BASE_URL}${API_ENDPOINTS.getPropertyDetails}`,
  getAdditionalDetails: `${API_BASE_URL}${API_ENDPOINTS.getAdditionalDetails}`,
  getOwnerGeneralDetails: (propertyId) => `${API_BASE_URL}${API_ENDPOINTS.ownerGeneralDetails(propertyId)}`,
  getSellerAgentList: `${API_BASE_URL}${API_ENDPOINTS.sellerAgentList}`,
  getSellerUserList: `${API_BASE_URL}${API_ENDPOINTS.sellerUserList}`,
  postAgentAssign: `${API_BASE_URL}${API_ENDPOINTS.agentAssign}`,
  postInitiateChat: `${API_BASE_URL}${API_ENDPOINTS.initiateChat}`,
  postConvertExcel: `${API_BASE_URL}${API_ENDPOINTS.convertExcel}`,
  postSailStatus: `${API_BASE_URL}${API_ENDPOINTS.setSailStatus}`,
  getExcelTemplate: `${API_BASE_URL}${API_ENDPOINTS.excelTemplate}`,



  //seller chat

  getSellerChatList: `${API_BASE_URL}${API_ENDPOINTS.sellerChatList}`,
  getSellerChatMessage: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.sellerChatMessage(chatId)}`,
  setSellerReadFlag: (chatId) =>
    `${API_BASE_URL}${API_ENDPOINTS.setSellerReadFlag(chatId)}`,
  postSendMessageSeller: `${API_BASE_URL}${API_ENDPOINTS.sendMessageSeller}`,


  //Contract
  getContractSailRecord: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.contractSailRecord(sailId)}`,
  postSelectContractType: `${API_BASE_URL}${API_ENDPOINTS.selectContractType}`,
  postGenerateContract: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.generateContract(sailId)}`,
  getBuyerSignUrl: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.buyerSignUrl(sailId)}`,
  getAgentSignUrl: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.agentSignUrl(sailId)}`,
  getOwnerSignUrl: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.ownerSignUrl(sailId)}`,
  getContractSignStatus: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.contractSignStatus(sailId)}`,

  postGenerateContractSeller: (sailId) => `${API_BASE_URL}${API_ENDPOINTS.generateContractSeller(sailId)}`,
  postRejectContarct: `${API_BASE_URL}${API_ENDPOINTS.rejectContract}`,
  postApproveContarct: (SailID) => `${API_BASE_URL}${API_ENDPOINTS.approveContract(SailID)}`,
  deleteContractAgent: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.deleteContractAgent(SailDocumentID)}`,
  deleteContractOwner: (SailDocumentID) => `${API_BASE_URL}${API_ENDPOINTS.deleteContractOwner(SailDocumentID)}`,




};
