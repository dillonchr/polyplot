const testsContext = require.context('.', false, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
