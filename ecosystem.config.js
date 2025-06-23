module.exports = {
  apps: [
    {
      name: "gigs",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/home/ec2-user/frontend",
      env: {
        NODE_ENV: "production",
      }
    },
  ],
};
