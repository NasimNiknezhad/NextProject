'use client';
import type { Signature } from '@prisma/client';
import classes from './SignatureToCheck.module.css';
import { approveSignature } from './petitionServerActions';
type Props = Signature;
export default function SignatureToCheck({ email, name, id }: Props) {
  return (
    <li className={classes.signature}>
      {name} {email}
      <button onClick={() => approveSignature(id, true)}>Annehmen</button>
      <button onClick={() => approveSignature(id, false)}>Löschen</button>
    </li>
  );
}
