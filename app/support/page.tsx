export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Support
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            We're here to help you with CryptoSignal
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Email Support
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 mb-2">
                    For general inquiries, technical support, or feedback:
                  </p>
                  <a
                    href="mailto:support@cryptosignal.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    support@cryptosignal.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-4 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                    Response Time
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400">
                    We typically respond to all inquiries within 24-48 hours during business days.
                    For urgent matters, please mark your email as "Urgent" in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                How do I use CryptoSignal?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                CryptoSignal is accessed through ChatGPT. Simply connect the CryptoSignal MCP
                server to your ChatGPT account and start asking questions about cryptocurrency
                markets, prices, RSI indicators, and more.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                What data does CryptoSignal provide?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                CryptoSignal provides real-time cryptocurrency market data including prices, RSI
                indicators (15m, 1h, 4h, 24h, 7d), market capitalization, trading volume, and
                24-hour price changes for top cryptocurrencies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                Is CryptoSignal free to use?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                CryptoSignal is free to use. However, access to ChatGPT may require a subscription
                depending on your OpenAI account type.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                How accurate is the market data?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                CryptoSignal uses data from CoinMarketCap API, which is a reputable source for
                cryptocurrency market data. However, market data may have slight delays and should
                not be used as the sole basis for trading decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                Does CryptoSignal provide investment advice?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                No. CryptoSignal provides market data and analysis for informational purposes only.
                It does not constitute financial, investment, or trading advice. Always conduct
                your own research and consult with qualified financial advisors before making
                investment decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                I'm experiencing technical issues. What should I do?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                If you encounter any technical issues, please email us at{" "}
                <a
                  href="mailto:support@cryptosignal.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  support@cryptosignal.com
                </a>{" "}
                with a detailed description of the problem, including any error messages and steps
                to reproduce the issue.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/privacy"
              className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                Privacy Policy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Learn how we protect your privacy and handle your data
              </p>
            </a>
            <a
              href="/terms"
              className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                Terms of Service
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Read our terms and conditions for using CryptoSignal
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

