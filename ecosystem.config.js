module.exports = {
    apps: [
        {
            name: "inbound-app",
            script: "./inboundMain.js",
            env: {
                NODE_ENV: 'development',
                INBOUND_SOURCE: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\inboundSource",
                INBOUND_DESTINATION: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\inboundSource\\inboundDestination",
                // OUTBOUND_SOURCE: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\outboundSource",
                // OUTBOUND_DESTINATION: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\outboundSource\\outboundDestination",
                MONGO_URI: "mongodb://localhost:27017/synchronisefile",
                // log_file: '/var/log/pm2/my-app-combined.log',
                out_file: '/var/log/pm2/inbound-app-out.log',
                error_file: '/var/log/pm2/inbound-app-error.log',
                // Enable log date formatting
                log_date_format: 'YYYY-MM-DD HH:mm:ss',

            },
            env_production: {
                NODE_ENV: 'production',
                INBOUND_SOURCE: "",
                INBOUND_DESTINATION: "",
                OUTBOUND_SOURCE: "",
                OUTBOUND_DESTINATION: "",
                MONGO_URI: "",
                // log_file: '/var/log/pm2/my-app-combined.log',
                out_file: '/var/log/pm2/inbound-app-out.log',
                error_file: '/var/log/pm2/inbound-app-error.log',
                // Enable log date formatting
                log_date_format: 'YYYY-MM-DD HH:mm:ss',

            }
        },
        {
            name: "outbound-app",
            script: "./outboundMain.js",
            env: {
                NODE_ENV: 'development',
                // INBOUND_SOURCE: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\inboundSource",
                // INBOUND_DESTINATION: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\inboundSource\\inboundDestination",
                OUTBOUND_SOURCE: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\outboundSource",
                OUTBOUND_DESTINATION: "D:\\APB 2024\\VISA B2B\\nodeJS_synchronize_files\\outboundSource\\outboundDestination",
                MONGO_URI: "mongodb://localhost:27017/synchronisefile",
                //   log_file: '/var/log/pm2/my-app-combined.log',
                out_file: '/var/log/pm2/outbound-app-out.log',
                error_file: '/var/log/pm2/outbound-app-error.log',
                // Enable log date formatting
                log_date_format: 'YYYY-MM-DD HH:mm:ss',

            },
            env_production: {
                NODE_ENV: 'production',
                INBOUND_SOURCE: "",
                INBOUND_DESTINATION: "",
                OUTBOUND_SOURCE: "",
                OUTBOUND_DESTINATION: "",
                MONGO_URI: "",
                // log_file: '/var/log/pm2/my-app-combined.log',
                out_file: '/var/log/pm2/outbound-app-out.log',
                error_file: '/var/log/pm2/outbound-app-error.log',
                // Enable log date formatting
                log_date_format: 'YYYY-MM-DD HH:mm:ss',

            }
        },
      /*   {
            name: "monitor-app",
            script: "./index.js",
        } */

    ]
}