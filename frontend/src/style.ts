const sidebareListBase =
    "flex items-center relative text-[20px] text-black py-[20px] px-[10px] hover:bg-[rgb(198,199,200)] hover:text-white w-[100%] max-[400px]:w-auto max-[400px]:h-[20px] max-[400px]:my-0 max-[400px]:mx-[10px] max-[400px]:py-0 max-[400px]:px-[2px] max-[400px]:rounded-[4px]";

const myReportDisplayBase =
    "text-[#676464] grid grid-cols-[70px_1.8fr_0.8fr_0.8fr_0.8fr_50px] items-center bg-[#fafafa] border border-[#e8e0e0] rounded-[10px] mb-2.5 p-[10px_12px] transition-all duration-200 hover:bg-[#fdfdfd] hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] max-md:flex max-md:flex-col max-md:items-start max-md:p-[15px] max-md:gap-2";
export const style: Record<string, string> = {
    userPage: "bg-[rgba(234, 16, 16, 0.457)]",
    adminPage: "bg-[rgba(234, 16, 16, 0.457)]",
    homePage: "flex object-cover w-[100%] h-[100%] max-[700px]:h-[100vh] max-[700px]:flex-col max-[700px]:flex-col max-[700px]:m-[10px_auto]",
    login: "relative w-[30%] mt-[40px] mb-[40px] ml-[10px] mr-[10px] pt-[20px] pb-[20px] pl-[10px] pr-[10px] rounded-[20px] bg-[#a49d9d61] max-[700px]:w-[80%] max-[700px]:py-[20px] max-[700px]:px-[20px] max-[700px]:mx-[auto] max-[700px]:my-[10px] ",

    status: "flex justify-center gap-[10px]",
    statusButton: "bg-white border-none px-[20px] py-[10px] rounded-[15px] cursor-pointer",

    formContainer: "flex flex-col items-center gap-[10px]",
    formInput: "border border-0 text-start outline-none mt-[10px] p-[10px]  p-[10px] rounded-[10px] w-[60%] bg-white",

    checkBoxContainer: "flex items-center justify-between mt-[40px] mb-[20px] text-[14px] font-sans text-[#1a1a1a]",
    rememberMe: "flex items-center gap-[6px] mr-[4px] text-[#333]",
    rememberInput: "w-[16px] h-[16px] mt-[2px] accent-[#0f2940] cursor-pointer",
    rememberLabel: "cursor-pointer select-none text-[#2e3a4e] font-medium",

    forgotLink: "text-[#2e78b9] font-medium transition duration-200 hover:underline hover:text-[#0a62e7]",

    loginContainer: "flex flex-col gap-[20px]",
    loginButton: "bg-black text-white cursor-pointer rounded-[20px] font-bold text-lg px-[20px] py-[15px] mt-[40px] w-[60%] block",

    changeStatusSpan: "text-[#2e78b9] cursor-pointer ml-[5px]",

    sendNotificationButton: "flex  items-center bg-[#17ee17] border-0 cursor-pointer gap-[10px] px-[10px] py-[10px] rounded-[10px] text-black hover:text-[white] hover:bg-[#adff2f]",

    opition: "relative cursor-pointer ",
    opitionButtons: "relative",

    menus: "flex flex-col gap-2 w-max max-w-[200px] z-[100] rounded-lg bg-white p-3 shadow-md absolute border top-[-20px] right-[50px] max-md:static max-md:w-full max-md:max-w-none max-md:rounded-md max-md:p-4 max-md:shadow-sm",

    myReport: "w-[75%] max-w-[900px] my-[30px] mx-auto bg-white rounded-[12px] shadow-[0_4px_15px_#00000014] p-[20px] overflow-x-auto max-[400px]:w-[80%]",

    myReportHeadTitle: "text-[1.4rem] font-semibold mb-4 text-[#333]",
    myReportHeadList: "grid grid-cols-[70px_1.8fr_0.8fr_0.8fr_0.8fr] items-center list-none p-0 m-0 text-[14px] font-medium text-[#555] max-md:hidden max-[768px]:hidden max-[768px]:text-[#c82333]",
    myReportHeadHr: "border-t border-[#e5e5e5] mt-2",

    myReportsDisplay: "flex flex-col mt-[15px] ",
    myReportDisplay: `
  grid grid-cols-[70px_1.8fr_0.8fr_0.8fr_0.8fr_50px] 
  mb-[10px] items-center 
  bg-[#fafafa] rounded-[10px] 
  border border-[#e8e0e0] 
  transition-all duration-200 
  px-[10px] py-[12px] 
  hover:bg-[#fdfdfd] hover:-translate-y-[2px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]
  max-[768px]:flex max-[768px]:flex-col max-[768px]:items-start max-[768px]:p-[15px] max-[768px]:gap-[8px]
`,
    deleteReport: "border-0 py-[6px] px-[6px] rounded-[6px]  text-red cursor-pointer items-center hover:bg-[#f8d7da] mx-[10px] hover:text-[#c82333]",
    reportImage: "w-[45px] h-[45px] rounded-full object-cover border-2 border-[#e0e0e0] max-md:mb-2",

    read: `${myReportDisplayBase} bg-[#fafafa]`,
    unRead: `${myReportDisplayBase} bg-[grey] text-white hover:text-black font-bold hover:bg-[grey]`,
    reportDisplayImage: "w-[45px] h-[45px] rounded-[50%] ",
    reportName: "text-[14px] text-[#333] font-medium mx-2 break-words",
    reportStatus: "text-[13px] font-semibold capitalize px-2 py-1.5 rounded-[6px] w-fit",
    statusSelect: "border-[1px] w-[80%] p-[10px] rounded-[10px] cursor-pointer",
    reportStatusPending: "bg-[#fff4e6] text-[#e07a0b]",
    reportStatusResolved: "bg-[#e6f9ef] text-[#2b8a3e]",
    reportDates: "text-[13px] text-[#777]",

    deleteButton: "flex  items-center bg-[red] border-0 cursor-pointer gap-[10px] px-[10px] py-[10px] rounded-[10px] text-white hover:text-[red] hover:bg-[grey]",
    markAsReadButton: "flex text-white items-center gap-[10px] bg-[#000000] px-[10px] py-[10px] cursor-pointer rounded-[10px] hover:text-[black] hover:bg-[white] hover:border-[1px] border-0",
    rightPage: "w-[75%] max-w[900px] my-[25px] mx-[10px] px-[20px] py-[10px] bg-[#ffffff] rounded-[12px] max-md:w-[80%] max-md:m-[10px_auto]",
    rightPageHeading: "text-[56px] font-semibold text-[#333] mb-[20px] max-md:text-[32px]",
    requestStatus: "flex gap-[20px] mb-[20px] pb-[10px] border-b border-[#e0e0e0] max-md:flex-wrap max-md:gap-[5px]",
    navItem: "text-[15px] font-medium text-[#555] cursor-pointer relative no-underline transition-colors duration-200 ease-linear hover:text-[#007bff] max-md:text-[12px]",
    active: "text-[#007bff] font-semibold border-b-2 border-red-500 rounded-tl-[3px] rounded-tr-[3px] rounded-br-[0px] rounded-bl-[0px]",
    report: "flex justify-between items-center bg-[#fafafa] border border-[#eee] rounded-[10px] py-[12px] px-[16px] mb-[12px] transition-transform transition-shadow duration-200 ease-linear hover:-translate-y-[2px] hover:shadow-[0_3px_10px_rgba(0,0,0,0.05)] max-md:flex-col max-md:items-start max-md:gap-2.5",
    reportDisplay: "flex items-center gap-[14px] max-md:flex-col max-md:items-start max-md:gap-2.5",
    reportDetail: "flex flex-col justify-center",
    reportDescription: "text-[14px] font-medium text-[#333] m-0 max-md:text-[12px]",
    reportedAt: "text-[12px] text-[#888] mt-[3px]",
    updatedAt: "text-[12px] text-[#888] mt-[4px]",
    reportStatusDisplay: "text-right max-md:text-left",
    reportsStatus: "inline-block text-[13px] font-semibold py-[5px] px-[10px] rounded-[6px] capitalize",

    sideBar: `
  w-1/4 bg-white mt-5 rounded-lg shadow-[1px_1px_2px_#201f1f]
  max-[400px]:w-[80%]
  max-[400px]:h-auto
  max-[400px]:m-[10px_auto]
  max-[400px]:flex
  max-[400px]:flex-row
  max-[400px]:items-center
  max-[400px]:justify-between
  max-[400px]:p-1
`,

    sideBarProfile: `
  py-[20px] px-[10px] rounded-tl-none rounded-tr-[10px] rounded-bl-none rounded-br-none bg-[#e4e0e0]
  max-[400px]:h-auto
  max-[400px]:py-1
  max-[400px]:px-2
  max-[400px]:flex
  max-[400px]:items-center
  max-[400px]:justify-start
  max-[400px]:gap-2
`,

    sideBarProfileDetail: "flex items-center justify-between max-sm:flex-col",
    sidebareDetail: "group flex flex-col items-center justify-center",

    profileImage: "rounded-full h-[40px] w-[40px] cursor-pointer max-[400px]:h-[30px] max-[400px]:w-[30px]",
    logOut: "hidden group-hover:flex py-[2px] px-[5px] text-red-500 cursor-pointer items-center border border-red-500 rounded-[4px] bg-white max-[400px]:py-1 max-[400px]:px-2",
    logoutText: "max-[400px]:hidden",

    sidebareSpan: "max-sm:hidden",

    sidebareLists: "flex flex-col max-[400px]:flex-row max-[400px]:items-center max-[400px]:justify-between gap-2",
    sidebareList: `${sidebareListBase} max-[400px]:w-auto`,

    activeSidebarList: `${sidebareListBase} bg-gray-500 z-10 text-white`,
    sidebareListText: "max-sm:hidden",

    reportCount: "relative top-[-15px] left-[-110px] py-[2px] px-[2px] text-[16px] bg-[red] rounded-[50%] max-sm:top-[-15px] max-sm:left-[-10px] max-[400px]:top-[-10px] max-[400px]:left-[20px]",
    notificationCount: "text-red relative top-[-10px] left-[25px] py-[2px] px-[2px] text-[16px] bg-red-500 rounded-full max-sm:top-[-10px] max-sm:left-[20px] max-[400px]:top-[-10px] max-[400px]:left-[20px]",

    noCount: "hidden",

    notification: "w-[75%] max-w-[900px] my-[20px] mx-auto bg-white py-[20px] px-[20px] shadow-[0_3px_10px_rgba(0,0,0,0.08)] rounded-[12px]",

    notificationHeader: "text-[1.4rem] font-semibold mb-[16px] text-[#333]",

    notificationsDisplay: "flex flex-col gap-[10px]",

    notificationDisplay: "flex items-center justify-between bg-[#fafafa] border border-[#eee] rounded-[10px] py-[10px] px-[14px] relative transition-transform transition-shadow duration-200 ease-linear hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]",

    unReadNotification: "bg-red-500 font-semibold text-white text-xs px-2 py-1 rounded-[20px]",

    adminProfile: "w-[45px] h-[45px] rounded-full object-cover border border-[#e0e0e0] max-[500px]:hidden",

    notificationContent: "flex flex-1 flex-col no-underline cursor-pointer",

    notificationContentText: "text-[14px] font-medium text-[#333] mx-0",

    notificationTime: "text-[#888] text-[12px] mt-[4px]",

    logoContainer: "w-[50%] flex items-center gap-[12px] font0-semibold",
    homeLogo: " justify-center py-[260px] px-[40px] bg-white max-[1200px]:flex-col max-[1200px]:px-[50px] max-[1200px]:py-[40px] max-[700px]:w-[100%] max-[700px]:m-[10px_auto] max-[700px]:py-[10px] max-[700px]:px-[10px]",
    logoIcon: "flex items-center justify-center bg-[#0f2940] rounded-[50%] w-[80px] h-[80px] relative text-[#fff] ",
    gear: "absolute flex justify-center items-center flex-col",
    icon: "text-[#fff]",
    light: "absolute top-[6px]",
    wrench: "absolute left-[8px] bottom-[8px]",
    drop: "absolute right-[8px] bottom-[8px]",
    logoTextHeader: "text-[56px] font-bold text-[#0f2940] gap-[1px] m-0",
    homeLogoTextHeader: "max-[400px]:text-[36px] max-[400px]:font-[medium] ",
    homeLogoTextParagraph: "max-[400px]:text-[13px]",
    logoTextParagraph: "text-[23px] text-[#2e4a66] m-0",
    navbar: "bg-[grey] flex justify-between items-center py-[10px] px-[40px] h-[80px] max-[500px]:h-[40px]",
    navbarUserProfile: "max-[500px]:flex max-[500px]:cursor-pointer text-white",
    navbarLogoContianer: "h-[20px] lex cursor-pointer items-center ",
    navbarLogoIcon: "w-[60px] h-[60px] max-[700px]:hidden",
    navbarLogoText: "text-[56px] font-bold text-[white] max-[500px]:text-[36px] max-[500px]:justify-center max-[500px]:flex max-[500px]:text-center max-[500px]:w-[100%] max-[500px]:px-[0px] max-[500px]:py-[0px] max-[500px]:mx-[0px] max-[500px]:my-[0px] max-[500px]:items-center",
    navGear: "w-[20px] h-[20px]",
    addReportButton: "max-[500px]:px-[0px] max-[500px]:py-[0px] max-[500px]:h-[40px] max-[500px]:w-[40px]",
    addReportText: "max-[500px]:hidden",
    setting: "w-[75%] max-w-[900px] my-[20px] mx-[auto] flex rounded-[30px] flex-col items-center py-[40px] px-[20px] bg-[#f1faf2] min-h-[50vh]",
    settingHeader: "text-[24px] font-semibold text-[black] mb-[30px] transform-capitalize ",
    profileDetail: "bg-[#fff] px-[40px] py-[30px] rounded-[16px] shadow-[0_4px_20px_rgba[0,0,0,0.08] w-[100%] max-w-[420px] flex flex-col items-center gap-[18px] x-[900px]:w-[70%]",
    profileImagePreview: "w-[130px] h-[130px] rounded-[50%] overflow-hidden border border-[3px] border-[#4f46e5] flex justify-center items-center bg-[#f0f0f0] cursor-pointer transition-transform duration-200 ease-linear hover:scale-[1.03]",
    settingProfileImage: "w-[100%] h-[100%] object-cover",
    fileInput: "text-[14px] px-[8px] py-[8px] border-[10px] bg-grey cursor-pointer text-[#444]",
    profileName: "flex",
    userPassword: "flex",
    navbarProfile: "flex justify-between gap-[10px] items-center",
    profileNameInput: "w-[100%] p-[12px_14px] border-[1px] border-[#ccc] rounded[10px] rounded-[10px] text-[15px] outline-none transition-border duration-200 ease-linear focus",
    userPasswordInput: "w-[100%] p-[12px_14px] border-[1px] border-[#ccc] rounded[10px] rounded-[10px] text-[15px] outline-none transition-border duration-200 ease-linear focus",
    passwordCheck: "flex gap-[10px] items-center cursor-pointer",
    passwordCheckInput: "cursor-pointer",
    settingButton: "bg-[#4f46e5] w-[100px] text-center text-[white] border-0 p-[12px_20px] rounded-[10px] text-[16px] cursor-pointer mt-[10px] transition-colors duration-300 ease-linear hover:bg-[#3730a3]",
    userHome: "m-[0px] min-h-[100vh] flex bg-[#aea6a6d6] max-[400px]:flex-col",
    navbarProfileUser: "hidden max-[500px]:flex max-[500px]:cursor-pointer",
    getStartedButton: "p-[10px] border-0 cursor-pointer bg-[tomato] rounded-[10px]",
    newReportButton: "flex items-center p-[10px] py-[10px] rounded-[20px] bg-white cursor-pointer max-[500px]:p-0 max-[500px]:h-[40px] max-[500px]:w-[40px]:text-center",
    newReportText: "max-[500px]:hidden",
    navPro: "max-[500px]:flex max-[500px]:w-full max-[500px]:items-center max-[500px]:p-0 max-[500px]:m-0 max-[500px]:justify-between",
    newReport: 'flex flex-col gap-[20px] w-[75%] items-center  max-w-[900px] my-[20px] mx-[auto] m-[10px_auto] rounded-[30px] flex-col items-center py-[40px] px-[20px] bg-[#f1faf2] min-h-[100vh] max-[400px]:w-[80%]',
    newReportHeader: 'text-[34px] font-semibold text-center text-[black] mb-[30px] transform-capitalize',
    newReportForm: 'flex w-[auto]',
    newReportDetail: 'flex flex-col gap-[10px]',
    newReportContent: 'flex bg-white w-[100%] m-[auto] outline-none rounded-[10px] items-center p-[10px]',
    newReportImage: 'w-auto bg-white flex flex-col  gap-[5px]',
    newReportImageContainer: 'w-[40%] h-[100%] cursor-pointer items-center m-[auto]',
    newReportFileInput: 'border-[1px] border-[grey] cursor-pointer rounded-[5px]',
    submitButton: 'flex p-[5px_10px] text-[24px] m-[10px_auto] text-center items-center bg-[#17ee17] cursor-pointer w-[50%] rounded-[10px]'

};
