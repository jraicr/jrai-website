export const languages = {
    en: 'English',
    es: 'Spanish',
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {

    en: {
        'header.greeting': 'Hi There!',
        'header.iam': 'I am',
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'link.resume.partial': 'View Full',
        'link.resume.last': 'Résumé',
        'link.projects.partial': 'View Full',
        'link.projects.last': 'Archive',
        'language.indicator': 'You are reading this site in',
    },

    es: {
        'language.indicator': 'Estás leyendo este sitio en',
        'header.greeting': 'Hola!',
        'header.iam': 'Soy',
        'nav.about': 'Sobre mí',
        'nav.experience': 'Experiencia',
        'nav.projects': 'Proyectos',
        'link.resume.partial': 'Ver CV',
        'link.resume.last': 'Completo',
        'link.projects.partial': 'Ver Proyectos',
        'link.projects.last': 'Completo',
    },

} as const;