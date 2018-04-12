/*The User() function serves as an outer scope that holds the vari‐
ables username and password, as well as the inner doLogin() func‐
tion; these are all private inner details of this User module that
cannot be accessed from the outside world.*/
function User(){
    var username,password;
    
    
    function dologin(username,password){
        this.username = username;
        this.password = password;
        console.log(this.username,this.password);
        return;
    }

    var publicApi = {
        login:dologin
    }

    return publicApi;

}
// create a `User` module instance
var fred = User();

/**
We are not calling new User() here, on pur‐
pose, despite the fact that probably seems more
common to most readers. User() is just a func‐
tion, not a class to be instantiated, so it’s just
called normally. Using new would be inappropri‐
ate and actually waste resources.
 */
console.log(fred.login( "fred", "12Battery34!" ));
/**
 * Executing User() creates an instance of the User module—a whole
new scope is created, and thus a whole new copy of each of these
inner variables/functions. We assign this instance to fred. If we run
User() again, we’d get a new instance entirely separate from fred
 * 
 * The inner doLogin() function has a closure over username and pass
word, meaning it will retain its access to them even after the User()
function finishes running.
publicAPI is an object with one property/method on it, login,
which is a reference to the inner doLogin() function. When we
return publicAPI from User(), it becomes the instance we call fred.
At this point, the outer User() function has finished executing. Nor‐
mally, you’d think the inner variables like username and password
have gone away. But here they have not, because there’s a closure in
the login() function keeping them alive.
 * 
 * 
 */