import React, { startTransition } from 'react';
import { X } from 'lucide-react';

export const DatenschutzModal = ({ setIsDatenschutzOpen }: { setIsDatenschutzOpen: (open: boolean) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => startTransition(() => setIsDatenschutzOpen(false))} />
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 className="text-2xl font-medium text-white">Datenschutzerklärung</h2>
          <button 
            onClick={() => startTransition(() => setIsDatenschutzOpen(false))}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-white/70 text-sm leading-relaxed space-y-8">
          
          <section>
            <h3 className="text-lg font-medium text-white mb-3">1. Datenschutz auf einen Blick</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">Allgemeine Hinweise</h4>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <h4 className="text-base font-medium text-white/90 mb-2">Datenerfassung auf dieser Website</h4>
            <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
            <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            <p className="mb-2"><strong>Wie erfasse ich Ihre Daten?</strong></p>
            <p className="mb-4">Ihre Daten werden zum einen dadurch erhoben, dass Sie mir diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch meine IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
            <p className="mb-2"><strong>Wofür nutze ich Ihre Daten?</strong></p>
            <p className="mb-4">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
            <p className="mb-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
            <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">2. Hosting</h3>
            <p className="mb-2">Ich hoste die Inhalte meiner Website bei folgendem Anbieter:</p>
            <h4 className="text-base font-medium text-white/90 mb-2">Cloudflare</h4>
            <p className="mb-4">Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (nachfolgend „Cloudflare“).</p>
            <p className="mb-4">Wenn Sie meine Website besuchen, erfasst Cloudflare verschiedene Logfiles inklusive Ihrer IP-Adressen. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">https://www.cloudflare.com/privacypolicy/</a>.</p>
            <p>Die Verwendung von Cloudflare erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung meiner Website.</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">Datenschutz</h4>
            <p className="mb-4">Ich nehme den Schutz Ihrer persönlichen Daten sehr ernst. Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            <h4 className="text-base font-medium text-white/90 mb-2">Hinweis zur verantwortlichen Stelle</h4>
            <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="mb-4">
              Robert Erbach<br />
              Am Stadtpark 43<br />
              04895 Falkenberg/Elster<br />
              Telefon: 0152-04041124<br />
              E-Mail: roberterbach@web.de
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">4. Datenerfassung auf dieser Website</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">Kontaktformular (Web3Forms)</h4>
            <p className="mb-4">Wenn Sie mir per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.</p>
            <p className="mb-4">Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt zur Abwicklung Ihrer Anfrage. Ich nutze für die Bereitstellung des Formulars den Dienst "Web3Forms" des Anbieters Web3Forms. Die von Ihnen eingegebenen Daten werden auf den Servern von Web3Forms verarbeitet.</p>
            <p className="mb-4">Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf meinem berechtigten Interesse an der effektiven Bearbeitung der an mich gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
            <p className="mb-6">Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>

            <h4 className="text-base font-medium text-white/90 mb-2">Bereitstellung von Downloads (Zertifikate)</h4>
            <p className="mb-6">Ich biete auf meiner Website Zertifikate zum Download an. Beim Herunterladen dieser Dateien werden standardmäßig technische Daten (wie Ihre IP-Adresse, Zeitpunkt des Downloads, Dateiname) durch meinen Hoster Cloudflare erfasst. Dies ist technisch notwendig, um den Download zur Verfügung zu stellen (Art. 6 Abs. 1 lit. f DSGVO). Es erfolgt keine darüber hinausgehende Auswertung Ihres Download-Verhaltens zu Marketingzwecken.</p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-white mb-3">5. Externe Ressourcen und CDN</h3>
            <h4 className="text-base font-medium text-white/90 mb-2">Bunny Fonts</h4>
            <p className="mb-4">Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten externe Ressourcen. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Webfonts direkt von den Servern des Anbieters (Bunny.net) in Ihren Browsercache. Hierbei wird technisch bedingt Ihre IP-Adresse an diesen Anbieter übertragen. Bunny Fonts ist eine datenschutzfreundliche Alternative zu Google Fonts und wird auf Servern innerhalb der EU bereitgestellt.</p>
            
            <h4 className="text-base font-medium text-white/90 mb-2">Verwendung eines Content Delivery Networks (CDN) – Cloudflare</h4>
            <p className="mb-4">Wir nutzen für die Bereitstellung von Medieninhalten (wie Videos und Bildern) das Content Delivery Network (CDN) von Cloudflare (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA).</p>
            <p className="mb-4">Zweck der Nutzung ist die Optimierung der Ladezeiten und die stabile, weltweite Bereitstellung unserer Assets. Durch die Nutzung dieses Dienstes werden Medieninhalte direkt von den Servern von Cloudflare geladen. Um diese Inhalte auszuliefern, verarbeitet Cloudflare technisch bedingt die IP-Adresse Ihres Endgeräts sowie weitere Log-Daten.</p>
            <p className="mb-4">Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie in der Datenschutzerklärung von Cloudflare: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">https://www.cloudflare.com/privacypolicy/</a>.</p>
            <p>Die Rechtsgrundlage für diese Datenverarbeitung ist unser berechtigtes Interesse an einer performanten, technisch stabilen und nutzerfreundlichen Bereitstellung unseres Onlineangebots (Art. 6 Abs. 1 f DSGVO).</p>
          </section>

        </div>
      </div>
    </div>
  );
};
