namespace ust.HanveshithReddy.Juvventhula.resue;

define type gender : String(1) enum { M; F };

// Pending Regex
@assert.format : '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'
@assert.format.message: 'Enter valid Phone Number'
define type phonenumber : String(30);

//Pending Regex
@assert.format : '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
@assert.format.message: 'Enter Valid Email'
define type email : String(255);

