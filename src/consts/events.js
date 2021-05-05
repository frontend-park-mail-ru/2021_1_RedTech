export const Events = {
    PathChanged: 'pathChanged',
    RedirectBack: 'redirectBack',
    RedirectForward: 'redirectForward',

    Content: {
        AddToFavourites: 'content:addToFavourites',
        RemoveFromFavourites: 'content:removeFromFavourites',
        Like: 'content:like',
        Dislike: 'content:dislike',
    },

    User: {
        Logout: 'user:logout',
        Login: 'user:login',
        Signup: 'user:signup',
        Update: 'user:updateProfile',
    },

    VideoPlayer: {
        Init: 'videoplayer:init',
    },

    Homepage: {
        Render: {
            Page: 'homepage:render',
            ErrorPage: 'homepage:renderErrorPage',
            Header: 'homepage:renderHeader',
            Content: 'homepage:renderContent',
        },
        SetEventListeners: 'homepage:setEventListeners',
        SetEventListenersForHeader: 'homepage:setEventListenersForHeader',
        Get: {
            InfoForHeader: 'homepage:InfoForHeader',
            MainPageContent: 'homepage:getMainPageContent'
        },
    },

    LoginPage: {
        Render: 'login:render',
    },

    SignupPage: {
        Render: 'signup:render',
    },

    GenrePage: {
        Render: {
            Page: 'genrepage:render',
            Content: 'genrepage:renderContent',
        },
        SetEventListeners: 'genrepage:setEventListeners',
        GetPageContent: 'genrepage:getPageContent',
    },

    ActorPage: {
        Render: {
            Page: 'actorpage:render',
            Content: 'actorpage:renderContent',
        },
        GetPageContent: 'actorpage:getPageContent',
    },

    FavouritesPage: {
        Render: {
            Page: 'favouritespage:render',
            Content: 'favouritespage:renderContent',
        },
        GetPageContent: 'favouritespage:getPageContent',
    },

    MediatekaPage: {
        Render: {
            Page: 'mediateka:render',
            Content: 'mediateka:renderContent',
        },
        SetEventListeners: 'mediateka:setEventListeners',
        GetPageContent: 'mediateka:getPageContent',
    },

    ProfilePage: {
        Render: {
            Page: 'profile:render',
            ProfileInfo: 'profile:renderProfileInfo',
            NewAvatar: 'profile:renderNewAvatar',
        },
        Get: {
            InfoAboutCurrentUser: 'profile:getInfoAboutCurrentUser',
            InfoForProfile: 'profile:getInfoForProfile',
        },
        SetEventListeners: 'profile:setEventListeners',
        Update: 'profile:updateProfile',
    },

    DetailPage: {
        Render: {
            Page: 'detailpage:render',
            DetailsAboutFilm: 'detailpage:renderDetailsAboutFilm',
            VideoPlayer: 'detailpage:renderVideoPlayer',
        },
        Change: {
            IconOfFav: 'detailpage:changeIconOfFav',
            IconOfLike: 'detailpage:changeIconOfLike',
        },
        SetEventListeners: 'detailpage:setEventListeners',
        GetInfoAboutMovie: 'detailpage:getInfoAboutFilm',
    },

};

export default Events;
