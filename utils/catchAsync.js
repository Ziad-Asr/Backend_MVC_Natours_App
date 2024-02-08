module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// the returned function will be assigned to the function that calls (catchAsync)
// {ex:- createTour will have the value of the returned function}
// And it will only be called when the user use the route that makes it work
// The (((next))) at catch makes it get the error message that gets when the promise of async is rejected
