import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import dollar_icon from "./dollar-symbol.png"
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import unfortunately from "./unfortunately.jpg"


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    dollar_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    unfortunately,
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'A7b@3XmZ9K2Q4Y5',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Richard James is a dedicated general physician with extensive experience in diagnosing and treating a wide range of medical conditions. He emphasizes preventive care and patient education to ensure long-term health and well-being.',
        fees: 50,
        address: {
            line1: '123 Health Lane',
            line2: 'Green Park, London'
        }
    },
    {
        _id: 'M4P@8NmX6B3Y9Z7',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Emily Larson is a compassionate gynecologist specializing in women’s health. She provides comprehensive care for pregnancy, reproductive health, and gynecological disorders, ensuring personalized treatment for every patient.',
        fees: 60,
        address: {
            line1: '456 Women’s Wellness Road',
            line2: 'Richmond, London'
        }
    },
    {
        _id: 'T9Gm2X@7K5B3L8Q',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Sarah Patel is a skilled dermatologist with expertise in treating skin, hair, and nail conditions. He is committed to providing advanced dermatological care and helping patients achieve healthy, glowing skin.',
        fees: 30,
        address: {
            line1: '789 Skin Care Avenue',
            line2: 'Brighton, London'
        }
    },
    {
        _id: 'Y5Bm9L@2X8Q4N3K',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Lee is a caring pediatrician dedicated to the health and well-being of children. He specializes in preventive care, growth monitoring, and treating childhood illnesses with a gentle and compassionate approach.',
        fees: 40,
        address: {
            line1: '101 Child Health Road',
            line2: 'Kingston, London'
        }
    },
    {
        _id: 'Z8Q@4Tm7B5X9L2N',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Jennifer Garcia is a highly experienced neurologist specializing in the diagnosis and treatment of neurological disorders. She is committed to providing cutting-edge care for conditions affecting the brain and nervous system.',
        fees: 50,
        address: {
            line1: '202 Neuro Care Lane',
            line2: 'Westminster, London'
        }
    },
    {
        _id: 'K3X@9Bm7N2T5L8Q',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. Andrew Williams is a renowned neurologist with extensive experience in managing complex neurological conditions. He focuses on delivering personalized care and improving patients’ quality of life.',
        fees: 50,
        address: {
            line1: '303 Brain Health Road',
            line2: 'Camden, London'
        }
    },
    {
        _id: 'Q2L@5Xm9B7T8N3K',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Christopher Davis is a trusted general physician with a patient-centered approach. He specializes in preventive care, chronic disease management, and promoting overall health and wellness.',
        fees: 50,
        address: {
            line1: '404 Wellness Lane',
            line2: 'Hammersmith, London'
        }
    },
    {
        _id: 'N7T@2Xm5B9L8Q3K',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Timothy White is a dedicated gynecologist with a focus on providing comprehensive care for women. He specializes in reproductive health, prenatal care, and minimally invasive surgeries.',
        fees: 60,
        address: {
            line1: '505 Women’s Health Road',
            line2: 'Chelsea, London'
        }
    },
    {
        _id: 'B9L@8Xm5T2N3K7Q',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ava Mitchell is a passionate dermatologist with expertise in medical and cosmetic dermatology. She is committed to helping patients achieve healthy skin through personalized treatment plans.',
        fees: 30,
        address: {
            line1: '606 Skin Wellness Avenue',
            line2: 'Wimbledon, London'
        }
    },
    {
        _id: 'X3K@7Bm9T2L8Q5N',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Jeffrey King is a compassionate pediatrician dedicated to providing high-quality care for children. He specializes in developmental pediatrics, vaccinations, and managing childhood illnesses.',
        fees: 40,
        address: {
            line1: '707 Child Wellness Road',
            line2: 'Greenwich, London'
        }
    },
    {
        _id: 'P4Y@9Xm2K3B7L8T',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Zoe Kelly is a highly skilled neurologist with expertise in treating complex neurological disorders. She is committed to providing compassionate care and improving patients’ neurological health.',
        fees: 50,
        address: {
            line1: '808 Neuro Wellness Lane',
            line2: 'Islington, London'
        }
    },
    {
        _id: 'N5T@3Xm7B9L2K8Q',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Patrick Harris is a renowned gastroenterologist specializing in digestive health. He provides advanced care for gastrointestinal disorders, including endoscopy and colonoscopy procedures.',
        fees: 50,
        address: {
            line1: '909 Digestive Health Road',
            line2: 'Brixton, London'
        }
    },
    {
        _id: 'L8Q@7Xm9B2T3K5N',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Chloe Evans is a dedicated general physician with a focus on preventive care and chronic disease management. She is committed to helping patients achieve optimal health through personalized care.',
        fees: 50,
        address: {
            line1: '1010 Wellness Lane',
            line2: 'Fulham, London'
        }
    },
    {
        _id: 'B7X@2Km9T5L8Q3N',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Ryan Martinez is a compassionate gynecologist specializing in women’s reproductive health. He provides comprehensive care for pregnancy, fertility, and gynecological conditions.',
        fees: 60,
        address: {
            line1: '1111 Women’s Health Avenue',
            line2: 'Lambeth, London'
        }
    },
    {
        _id: 'X9T@5Lm8B3K7Q2N',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Amelia Hill is a dedicated dermatologist with expertise in medical and cosmetic skin treatments. She is passionate about helping patients achieve healthy and radiant skin.',
        fees: 30,
        address: {
            line1: '1212 Skin Care Road',
            line2: 'Southwark, London'
        }
    },
    {
        _id: 'T2B@7Xm9L5K8Q3N',
        name: 'Dr. Priya Singh',
        image: doc16,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Priya Singh is a highly skilled gastroenterologist dedicated to providing top-notch digestive care. With expertise in treating a wide range of gastrointestinal disorders, she focuses on patient well-being, early diagnosis, and advanced treatment solutions.',
        fees: 30,
        address: {
            line1: 'Plot No. 24, MG Road',
            line2: 'Sector 42, Gurugram, Haryana, India'
        }
    }
];