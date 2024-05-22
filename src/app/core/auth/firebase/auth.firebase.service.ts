import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TSocialNetwork } from '@auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async loginWithSocialNetwork(network: TSocialNetwork): Promise<void> {
    const user = await this.signInWithSocialNetwork(network);
    if (user) {
      return this.updateUserData(user); // Solo si se usa Firebase Firestore para la base de datos
    }
  }

  private async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user): Promise<void> {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'USER',
    };
    return userRef.set(data, { merge: true });
  }

  logout(): void {
    this.afAuth.signOut();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async signInWithSocialNetwork(network: TSocialNetwork): Promise<any> {
    switch (network) {
      case 'google':
        return this.loginWithGoogle();
      case 'facebook':
        return null;
      case 'github':
        return null;
      default:
        console.error('Unsupported social network');
        return null;
    }
  }
}
