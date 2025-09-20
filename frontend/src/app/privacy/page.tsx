"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-6 prose prose-invert">
      <h1>Politique de confidentialité</h1>

      <p>
        Votre vie privée est importante. Cette politique décrit quelles informations personnelles
        sont collectées sur ce site, comment elles sont utilisées et vos droits en tant qu&apos;utilisateur.
      </p>

      <h2>1. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires au fonctionnement du site :</p>
      <ul>
        <li>Nom d&apos;utilisateur et email pour l&apos;authentification.</li>
        <li>Relations d&apos;amis et données de profil.</li>
        <li>Logs liés à la sécurité et aux sessions.</li>
        <li>Données générées par les notifications WebSocket (temps réel).</li>
      </ul>

      <h2>2. Utilisation des données</h2>
      <p>Les informations collectées servent à :</p>
      <ul>
        <li>Créer et gérer votre compte.</li>
        <li>Gérer vos relations d&apos;amis et notifications.</li>
        <li>Assurer la sécurité et la maintenance du site.</li>
        <li>Améliorer l&apos;expérience utilisateur.</li>
      </ul>

      <h2>3. Partage des données</h2>
      <p>
        Vos données ne sont jamais revendues ni partagées avec des tiers à des fins commerciales. 
        Elles peuvent être accessibles uniquement aux administrateurs pour des raisons techniques.
      </p>

      <h2>4. Sécurité</h2>
      <p>
        Toutes les informations sont stockées sur des serveurs sécurisés. Les mots de passe sont
        hachés, et les communications entre le frontend et le backend sont sécurisées via HTTPS.
      </p>

      <h2>5. Durée de conservation</h2>
      <p>
        Vos données sont conservées tant que votre compte existe. Vous pouvez demander leur suppression à tout moment.
      </p>

      <h2>6. Vos droits</h2>
      <p>Conformément au RGPD, vous pouvez :</p>
      <ul>
        <li>Accéder à vos données.</li>
        <li>Rectifier des informations inexactes.</li>
        <li>Demander la suppression de vos données.</li>
        <li>Demander la portabilité de vos données.</li>
        <li>Retirer votre consentement au traitement des données.</li>
      </ul>

      <h2>7. Contact</h2>
      <p>
        Pour toute question ou demande liée à vos données personnelles, vous pouvez me contacter
        à l&apos;adresse :{" "}
        <a
          href="mailto:thorel.olivier@hotmail.com"
          className="text-indigo-400 hover:text-indigo-200 transition-colors"
        >
          thorel.olivier@hotmail.com
        </a>.
      </p>

      <p>
        Retour à la page{" "}
        <Link href="/" className="text-indigo-400 hover:text-indigo-200 transition-colors">
          Home
        </Link>.
      </p>

      <Footer />
    </div>
  );
}
