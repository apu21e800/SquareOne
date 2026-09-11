This folder was committed by accident with the 2026-09-11 launch push.
It is now gitignored. The current orientation is docs/ORIENTATION.md; this
stale copy was emptied because the repository is public.

To remove the folder from the repository (keeping the local files):

    git rm -r --cached "Claude outputs"
    git commit -m "chore: drop accidental Claude outputs folder"
