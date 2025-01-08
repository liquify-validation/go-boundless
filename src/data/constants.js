import {
  DataIcon,
  ConnectionIcon,
  DualSimsIcon,
  CustomerSupportIcon,
  NoRoamingChargesIcon,
  StayConnectedIcon,
  TickIcon,
} from "../assets";

import UK from "../assets/countries/UK.svg";
import Turkey from "../assets/countries/Turkey.svg";
import Thailand from "../assets/countries/Thailand.svg";
import Philippines from "../assets/countries/Phillipines.svg";
import Vietnam from "../assets/countries/Vietnam.svg";
import USA from "../assets/countries/USA.svg";
import Singapore from "../assets/countries/Singapore.svg";
import Sweden from "../assets/countries/Sweden.svg";
import Germany from "../assets/countries/Germany.svg";
import France from "../assets/countries/France.svg";
import PuertoRico from "../assets/countries/PuertoRico.svg";
import Spain from "../assets/countries/Spain.svg";

export const featuresData = [
  {
    icon: DataIcon,
    title: "Flexible Data Plans",
    details: [
      "No need to worry about data limits, We have a wide range of data plans to fit all of your needs.",
    ],
  },
  {
    icon: ConnectionIcon,
    title: "Fast and Reliable Internet Connection",
    details: [
      "Enjoy a stable and consistent connection no matter where your travels take you.",
    ],
  },
  {
    icon: StayConnectedIcon,
    title: "Stay Connected Anywhere",
    details: [
      "Never lose contact while traveling; reliable connections are available anywhere, anytime.",
    ],
  },
  {
    icon: NoRoamingChargesIcon,
    title: "No Roaming Charges",
    details: [
      "Say goodbye to roaming fees and use your data freely in multiple destinations.",
    ],
  },
  {
    icon: CustomerSupportIcon,
    title: "Customer Support",
    details: [
      "We are here to help with quick and responsive support, anytime you need it.",
    ],
  },
  {
    icon: DualSimsIcon,
    title: "Enjoy Dual Sims",
    details: [
      "Easily switch between your personal and travel data sims on modern devices.",
    ],
  },
];

export const faqData = {
  title: "Frequently Asked Questions",
  subtext:
    "Find answers to the most common questions about our service and products.",
  faqs: [
    {
      question: "What is an eSIM?",
      answer:
        "eSIM, or embedded SIM, is a digital SIM card that is built directly into a device, such as a smartphone or tablet. Unlike traditional SIM cards that are physical and need to be inserted into a device, eSIMs are integrated into the device's hardware and can be activated remotely.",
    },
    {
      question: "How Does It Work?",
      answer:
        "eSIM is instantly installed on all eSIM-compatible devices via the DENT app, providing a 4G/LTE connection wherever you go. Please note that the DENT eSIM offers only data connectivity, meaning there’s no accompanying phone number.\n" +
        "Enjoy the benefits of a 4G/LTE connection, ensuring a smooth browsing experience—vital for tasks such as video calls, streaming, or downloading large files.",
    },
    {
      question: "Who can use eSIM Data?",
      answer:
        "International Data is available via eSIM. So, if your phone is eSIM capable, you can get started. You can find a current list of supported eSIM devices here. Also, make sure that your device is not SIM-locked by your reseller. Please note: for Data to work, you need to activate data roaming in your phone preferences.\n" +
        "If you bought your iPhone in China mainland, Hong Kong or Macao please read the special notes from Apple here: https://support.apple.com/en-us/HT209044.",
    },
    {
      question: "Can I use 2 SIMs at the same time?",
      answer:
        "Yes, you can use your physical SIM for calls and SMS and the eSIM for your data needs - if your device supports Dual SIM. Many eSIM capable phones, e.g. Apple iPhone 11 Pro or Samsung S20, support Dual SIM. This allows you to have your physical SIM and your eSIM active at the same time. iPhone model 13 and higher support 2 active eSIMs at the same time.\n" +
        "Please check whether your phone settings and software versions support Dual SIM Standby.",
    },
    {
      question: "Can I make phone calls or send SMS with eSIM service?",
      answer:
        "Our eSIM is for mobile internet only. It does not come with a mobile phone number, and it is not supposed to make phone calls or send SMS. However, you can use VoIP apps such as WhatsApp or Skype to make voice calls and text.",
    },
    {
      question: "Shall I activate eSIM before or after landing?",
      answer:
        "eSIM activation requires an internet connection, so we strongly suggest you activate it before arriving at your destination. But you could also use local Wi-Fi at the airport to place an order and activate eSIM right after landing.",
    },
  ],
};

export const howItWorksData = [
  {
    icon: TickIcon,
    text: "Fast and easy installation",
  },
  {
    icon: TickIcon,
    text: "Connect to mobile internet automatically",
  },
  {
    icon: TickIcon,
    text: "100% secure payment",
  },
  {
    icon: TickIcon,
    text: "QR code delivered to your email",
  },
  {
    icon: TickIcon,
    text: "Check you phone compatibility",
  },
  {
    icon: TickIcon,
    text: "24/7 Customer support",
  },
];

export const countryData = [
  {
    countryName: "United Kingdom",
    countryIcon: UK,
    price: "$15.00",
    link: "/country/united-kingdom",
  },
  {
    countryName: "Turkey",
    countryIcon: Turkey,
    price: "$12.00",
    link: "/country/turkey",
  },
  {
    countryName: "Thailand",
    countryIcon: Thailand,
    price: "$14.00",
    link: "/country/thailand",
  },
  {
    countryName: "Philippines",
    countryIcon: Philippines,
    price: "$14.00",
    link: "/country/philippines",
  },
  {
    countryName: "Vietnam",
    countryIcon: Vietnam,
    price: "$14.00",
    link: "/country/vietnam",
  },
  {
    countryName: "Spain",
    countryIcon: Spain,
    price: "$14.00",
    link: "/country/spain",
  },
  {
    countryName: "USA",
    countryIcon: USA,
    price: "$14.00",
    link: "/country/usa",
  },
  {
    countryName: "Singapore",
    countryIcon: Singapore,
    price: "$14.00",
    link: "/country/singapore",
  },
  {
    countryName: "Sweden",
    countryIcon: Sweden,
    price: "$14.00",
    link: "/country/sweden",
  },
  {
    countryName: "France",
    countryIcon: France,
    price: "$14.00",
    link: "/country/france",
  },
  {
    countryName: "Germany",
    countryIcon: Germany,
    price: "$14.00",
    link: "/country/germany",
  },
  {
    countryName: "Puerto Rico",
    countryIcon: PuertoRico,
    price: "$14.00",
    link: "/country/puerto-rico",
  },
];
