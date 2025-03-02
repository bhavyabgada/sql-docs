#!/bin/bash

# SQL Docs AI Setup Script

echo "Setting up SQL Docs AI..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Check if the submodule is initialized
if [ ! -f "sql-content/README.md" ]; then
    echo "Initializing SQL content submodule..."
    git submodule update --init --recursive
fi

# Create .env file for AI inference if it doesn't exist
if [ ! -f "ai-inference/.env" ]; then
    echo "Creating .env file for AI inference..."
    cp ai-inference/.env.example ai-inference/.env
    echo "Please edit ai-inference/.env and add your OpenAI API key."
fi

# Create necessary directories
mkdir -p docs-site/static/img

# Create a simple logo for the docs site
cat > docs-site/static/img/logo.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#2e8555" d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
</svg>
EOL

# Create a favicon for the docs site
cp docs-site/static/img/logo.svg docs-site/static/img/favicon.ico

# Add frontmatter to README.md files in the submodule if they don't have it
if ! grep -q "^---" sql-content/0_readme.md; then
    echo "Adding frontmatter to 0_readme.md..."
    sed -i '' '1i\
---\
id: 0_readme\
title: SQL Learning Path\
slug: /\
---\
' sql-content/0_readme.md
fi

# Check and add frontmatter to each section README
for dir in sql-content/[1-8]*; do
    readme="$dir/README.md"
    if [ -f "$readme" ] && ! grep -q "^---" "$readme"; then
        dir_name=$(basename "$dir")
        echo "Adding frontmatter to $dir_name/README.md..."
        sed -i '' "1i\\
---\\
id: $dir_name/README\\
title: $(echo $dir_name | sed 's/[0-9]*_//g' | sed 's/_/ /g' | sed 's/\b\(.\)/\u\1/g')\\
---\\
" "$readme"
    fi
done

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit ai-inference/.env and add your OpenAI API key"
echo "2. Run the documentation site: docker-compose -f docker-compose.docs.yml up"
echo "3. Run the AI inference engine: docker-compose -f docker-compose.ai.yml up"
echo "4. Or run both services: docker-compose up"
echo ""
echo "Documentation site will be available at: http://localhost:3000"
echo "AI inference engine will be available at: http://localhost:8000" 