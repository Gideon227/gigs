// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "gigs-tech-frontend",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        cwd: "/home/ec2-user/frontend",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
};
  