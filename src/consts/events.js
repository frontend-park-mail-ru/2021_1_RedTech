export const Events = {
    PathChanged: 'pathChanged',
    RedirectBack: 'redirectBack',
    RedirectForward: 'redirectForward',

    Homepage: {
        Render: {
            Page: 'homepage:render',
            ErrorPage: 'homepage:renderErrorPage',
            Header: 'homepage:renderHeader',
            Content: 'homepage:renderContent',
        },
        SetEventListeners: 'homepage:setEventListeners',
        SetEventListenersForHeader: 'homepage:setEventListenersForHeader',
        Logout: 'homepage:logout',
        Get: {
            InfoForHeader: 'homepage:InfoForHeader',
            MainPageContent: 'homepage:getMainPageContent'
        },
    },

    LoginPage: {
        Render: 'login:render',
        LoginUser: 'login:loginUser',
    },

    SignupPage: {
        Render: 'signup:render',
        SignupUser: 'signup:signUpUser',
    },

    GenrePage: {
        Render: {
            Page: 'genrepage:render',
            Content: 'genrepage:renderContent',
        },
        SetEventListeners: 'genrepage:setEventListeners',
        GetPageContent: 'genrepage:getPageContent',
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
        SaveChanges: 'profile:saveChanges',
        SetEventListeners: 'profile:setEventListeners',
        Update: 'profile:updateProfile',
    },

    DetailPage: {
        Render: {
            Page: 'detailpage:render',
            DetailsAboutFilm: 'detailpage:renderDetailsAboutFilm',
        },
        Change: {
            IconOfFav: 'detailpage:changeIconOfFav',
            IconOfLike: 'detailpage:changeIconOfLike',
        },
        SetEventListeners: 'detailpage:setEventListeners',
        GetInfoAboutMovie: 'detailpage:getInfoAboutFilm',
        AddToFavourites: 'detailpage:addToFavourites',
        RemoveFromFavourites: 'detailpage:removeFromFavourites',
        Like: 'detailpage:like',
        Dislike: 'detailpage:dislike',
    },

};

export default Events;