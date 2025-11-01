set -e

echo "Starting build and minification..."

# Installer les dépendances
npm ci

# Build du projet
npm run build

# Minification des fichiers JS dans dist/
if [ -d "dist" ]; then
  for file in dist/*.js; do
    echo "Minifying $file..."
    npx terser "$file" -o "$file" --compress --mangle
  done
fi

echo "✅ Build and minification completed!"
