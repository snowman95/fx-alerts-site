(() => {
  const params = new URLSearchParams(window.location.search)
  const units = { USD:1, JPY:100, EUR:1, CNY:1, GBP:1, AUD:1, CAD:1, HKD:1, THB:1, VND:100, TWD:1, SGD:1, CHF:1, PHP:1, MYR:1, IDR:100, NZD:1, MXN:1, TRY:1, INR:1 }
  const currency = params.get('currency')
  const date = params.get('date')
  const raw = params.get('rate')
  const rate = raw && raw.length <= 40 ? Number(raw) : NaN
  const parsed = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? Date.parse(date + 'T00:00:00Z') : NaN
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone:'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date())
  if (!Object.hasOwn(units, currency) || !Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0,10) !== date || date > today || !Number.isFinite(rate) || rate <= 0 || !Number.isFinite(rate * units[currency])) return
  document.getElementById('shared-rate').textContent = units[currency] + ' ' + currency + ' = ' + new Intl.NumberFormat('ko-KR', {maximumFractionDigits:2}).format(rate * units[currency]) + '원'
  document.getElementById('shared-date').textContent = '자료 기준일: ' + date + (date === today ? ' · 오늘 기준일 자료' : ' · 지난 기준일 자료, 오늘 시세 아님') + ' · 일별 참고 환율'
})()
