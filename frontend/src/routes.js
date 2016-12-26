import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';

/* import Chat from './components/chat';*/
/* import PostList from './components/post_list';*/

/* import About from './components/about';*/


export default (
    <Route path="/" component={App}>
	<IndexRoute component={App} />
    </Route>
)

/*
   <Route path="post/new" component={RequireAuth(PostNew)} />
<Route path="post/:slug" component={PostDetail} />
*/
